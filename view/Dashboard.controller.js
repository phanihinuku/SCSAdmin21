// Load the rounded tile control
jQuery.sap.require("com.view.RoundedTile");
jQuery.sap.require("com.model.settings");
jQuery.sap.require("com.utils.utils");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.unified.Menu");
jQuery.sap.require("sap.ui.unified.MenuItem");

sap.ui.controller("com.view.Dashboard", {
	toContacts:function(){
		
		this._oRouter.navTo("idUpload");
	},
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf com.view.Dashboard
	 */
		onInit: function() {
				this._oView = this.getView();
		this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this._oView));
		this._oResourceBundle = this._oComponent.getModel("i18n").getResourceBundle();
		this._oRouter = this._oComponent.getRouter();
		},
		openMenu:function(oEvent){
		var oButton = oEvent.getSource();
		var that= this.getParent().getParent().getParent();
		if(that._menu==null){
		that._menu = new sap.ui.unified.Menu("userMenu",{
			items:[new sap.ui.unified.MenuItem({text:"Logout",icon:"sap-icon://log",select:function(){window.history.back(-1);}}),
			       new sap.ui.unified.MenuItem({text:"User Preferences",icon:"sap-icon://action-settings"}),
			       new sap.ui.unified.MenuItem({text:"Add User",icon:"sap-icon://add-contact",select:function(){
			       	// app.to("idAdduser");
			       		var router = sap.ui.getCore().byId('idDashboard').getParent().getController()._oRouter;
			       		router.navTo("idAdduser");
			       }}),
			       new sap.ui.unified.MenuItem({text:"SMS Gateway ",icon:"sap-icon://iphone-2",select:function(){window.open('https://www.twilio.com/user/billing', 'Twilio'); }})
			]
//		https://www.twilio.com/user/billing
		});
		that.addDependent(this._menu);
	}
		var eDock = sap.ui.core.Popup.Dock;
		//that._menu.open( oButton);
		that._menu.open(that._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
	},
		// ,
importCustomers:function(){
	
						var router = sap.ui.getCore().byId('idDashboard').getParent().getController()._oRouter;
			       		router.navTo("idImportCustomers");
	},
		// ,
customerSegmentation:function(){
	
						var router = sap.ui.getCore().byId('idDashboard').getParent().getController()._oRouter;
			       		router.navTo("idCustomerSegmentation");
	},
smsbox:function(){
							var router = sap.ui.getCore().byId('idDashboard').getParent().getController()._oRouter;
			       		router.navTo("idSMSBox");
},
importSMS:function(){
						var router = sap.ui.getCore().byId('idDashboard').getParent().getController()._oRouter;
			       		router.navTo("idImportSMS");
	
},
importAppointmentSMS:function(){
						var router = sap.ui.getCore().byId('idDashboard').getParent().getController()._oRouter;
			       		router.navTo("idImportAppointmentSMS");
	
}
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf com.view.Dashboard
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf com.view.Dashboard
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf com.view.Dashboard
	 */
	//	onExit: function() {
	//
	//	}

});