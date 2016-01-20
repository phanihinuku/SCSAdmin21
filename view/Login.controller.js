jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.MessageStrip");
jQuery.sap.require("com.utils.utils");
jQuery.sap.require("com.model.settings");

jQuery.sap.require("sap.ui.core.mvc.Controller");
sap.ui.core.mvc.Controller.extend("com.view.Login", {
	strip:null,
onInit: function() {
			
		this._oView = this.getView();
		this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this._oView));
		this._oResourceBundle = this._oComponent.getModel("i18n").getResourceBundle();
		this._oRouter = this._oComponent.getRouter();

		},
validateUser:function(){
	
		var that =this;//"sap.ui.getCore().byId('idLogin').getController();
	
	com.utils.utils.logout(that,that.logoutSuccess,that.errorCallback)
	
},
logoutSuccess:function(data,status,headers,context){
	
		
		var uname=context.byId('uid').getValue();
		var pwd=context.byId('pwd').getValue();
		var creds={username:uname,password:pwd};
		// logout success
		// niw login
	if(JSON.parse(data).success) {
		var call = {};
	
		call.url = com.model.settings.getBaseUrl() + "/SCSAdmin/php/user_login.php";
		call.headers = {
			ContentType: "application/x-www-form-urlencoded"
		};
		call.successCallback = context.loginSuccessCallback;
		call.errorCallback = context.errorCallback;
		call.method = "POST";
		call.dataStr = "data=" + JSON.stringify(creds);
		call.loadStr = context._oResourceBundle.getText("Loggingin");
		com.utils.utils.dbcall(context, call);
		
		
	}
},
errorCallback:function(err,context){
	sap.m.MessageToast.show(context._oResourceBundle.getText("Transactionfailed"));
},
loginSuccessCallback:function(data,status,hdrs,context){
		if (data!=null&&JSON.parse(data)!=null) {
			if(JSON.parse(data).success){
				sap.m.MessageToast.show(context._oResourceBundle.getText("LoginSuccess"));
			
			
			// contect.getView().getPages()addContent
				if(JSON.parse(data).success!=null&&data!=null){
					// var oModel= new sap.ui.model.json.JSONModel();
					// oModel.setData(data);
					// sap.ui.getCore().setModel(oModel,'UD');
					// context._oView.byId("welcome").setText(this._oComponent.getText("welcome")+JSON.parse(data).display_name);
				}
				context.byId('uid').setValue("");
				context.byId('pwd').setValue("");
			//	app.to('idDashboard');
				context._oRouter.navTo("idDashboard");
				// , {
				// 		from: "idLogin",
				// 		entity: "Dashboard",//oEvent.getSource().getBindingContext().getPath().substr(1),
				// 		tab: null
				// 	});
			
			}else{
			//	sap.m.MessageToast.show(JSON.parse(data).message);
				
			context.strip = new sap.m.MessageStrip({text:JSON.parse(data).message,
												showCloseButton:true,
												type:"Error"
			});
			if(context!=null&&context.getView()!=null&&context.getView().getContent().length>0){
							context.getView().getContent()[0].addContent(context.strip);
							}
			//hardcoded for testing
					// app.to('idDashboard');
			//
			}
		}
	
		
},
validate: function(e) {

		if (e.getSource()) {
			com.utils.utils.validate(e.getSource());
		}
	}
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf com.controllercockpit.view.webapp.view.Login
	 */
	// onInit: function() {
	// 	this._oView = this.getView();
	// 	this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this._oView));
	// 	this._oResourceBundle = this._oComponent.getModel("i18n").getResourceBundle();
	// 	this._oRouter = this._oComponent.getRouter();
	// 	},

	,onLogin: function(){
		this._oRouter.navTo("idDashboard");
	}
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf com.controllercockpit.view.webapp.view.Login
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf com.controllercockpit.view.webapp.view.Login
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf com.controllercockpit.view.webapp.view.Login
	 */
	//	onExit: function() {
	//
	//	}

});