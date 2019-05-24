sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/m/BusyDialog",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, BusyDialog, JSONModel) {
	"use strict";
	return UIComponent.extend("test.Component", {
		metadata: {
			manifest: "json"
		},
		init: function () {
			sap.ui.core.UIComponent.prototype.init.apply( this, arguments);
			this.oBusy = new BusyDialog();
			this.oBusy.setBusyIndicatorDelay(0);
			this.mDepts = new JSONModel("./departments.json");
			this.getRouter().initialize();
		}
	});

});
