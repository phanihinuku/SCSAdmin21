jQuery.sap.require("com.utils.formatter");
jQuery.sap.require("com.utils.utils");
jQuery.sap.require("com.model.settings");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("com.view.SMSBox", {
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf com.view.Upload
	 */
	onInit: function() {
		this._oView = this.getView();
		this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this._oView));
		this._oResourceBundle = this._oComponent.getModel("i18n").getResourceBundle();
		this._oRouter = this._oComponent.getRouter();
		this._oRouter.attachRoutePatternMatched(this.onRoutematched, this);
	},
	back: function() {
		window.history.back(-1);
	},
	logout: function() {
		window.history.back(-2);
	},
	onRoutematched: function() {

		//Load Inbox Data
		var that = this; //sap.ui.getCore().byId('idDashboard').getController()
		var call = {};
		call.url = com.model.settings.getBaseUrl() + "/SCSAdmin/php/inbox.php";

		call.successCallback = that.inboxReadSuccessCallbackInit;
		call.errorCallback = that.errorCallback;
		call.method = "POST";
		call.loadStr = "Loading Inbox Data";
		com.utils.utils.dbcall(that, call);
	},
	inboxReadSuccessCallbackInit: function(data, status, hdr, context) {
		if (data != null) {
			if ((data.indexOf("Fatal error") >= 0) || (data.indexOf("Warning") >= 0) || (data.indexOf("Notice") >= 0)) {
				sap.m.MessageToast.show(context._oResourceBundle.getText("InboxItemsLoadFailed"));
			} else {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(JSON.parse(data));
				sap.ui.getCore().setModel(oModel, 'IM');

			}
		}
	},
	errorCallback: function(e, context) {

		sap.m.MessageBox.show(context._oResourceBundle.getText("ErrorWhileLoadingInboxData", {
			icon: sap.m.MessageBox.Icon.Error,
			title: "Error"
		}));
	},
	handleIconTabBarSelect: function(oEvent) {
		// var oModel = sap.ui.getCore().getModel('IM');
		// sap.ui.getCore().byId('idInbox').setModel(oModel);

		var oTable = this.byId('inboxTable');
		// var oBinding = oTable.getBinding("items"),
		var sKey = oEvent.getParameter("key");

		if (sKey === "NEW") {
			oTable.bindItems('IM>/scheduled', this.byId('cli'));
		} else if (sKey === "CMP") {
			// oTable.bindItems('IM>/completed', this.byId('cli'));
			oTable.bindAggregation('items','IM>/completed', this.byId('cli'));
		} else if (sKey === "CNC") {
			oTable.bindItems('IM>/cancelled', this.byId('cli'));
		} else if (sKey === "FLD") {
			oTable.bindItems('IM>/failed', this.byId('cli'));
		}
	},

	gotoCompose: function() {
		// Load Group data
		// var call = {};
		// var that = sap.ui.getCore().byId('idDashboard').getController();
		// var queryStr = "SELECT * FROM `groups` WHERE user='admin'";
		// call.url = com.scs.model.settings.getBaseUrl() + "/SCSAdmin/php/read.php";
		// call.headers = {
		// 	ContentType: "application/x-www-form-urlencoded"
		// };
		// call.successCallback = that.groupReadSuccessCallbackInit;
		// call.errorCallback = that.errorCallback;
		// call.method = "POST";
		// call.dataStr = "query=" + queryStr;
		// call.loadStr = "Loading Group Data";
		// com.scs.utils.utils.dbcall(that, call);
		
		this._oRouter.navTo("idComposeSMS");
	}

	/**this
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf com.view.Upload
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf com.view.Upload
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf com.view.Upload
	 */
	//	onExit: function() {
	//
	//	}

});