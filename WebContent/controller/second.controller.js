sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/m/TablePersoController",
    "test/persoService/perso"
], function (Controller, JSONModel, History, TablePersoController, persoService) {
    "use strict";
    return Controller.extend( "test.controller.second", {
        onInit: function() {
            this.getView().setModel(this.getOwnerComponent().mDepts, "mView");
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("second").attachPatternMatched(this._onRouteMatched, this);
            this._oTPCfirst = new TablePersoController({
				table: sap.ui.getCore().byId(this.createId("secondTableFirst")),
				componentName: "App",
				persoService: persoService
            }).activate();
        },
        onSecondFirstPersoButtonPressed: function() {
            this._oTPCfirst.openDialog();
        },
        _onRouteMatched: function(oEvent){
            var idSelected = oEvent.getParameter("arguments").selected;
            var oDepts = this.getView().getModel("mView").getProperty("/departments");
            if (oDepts && oDepts.length) {
                var oDept = oDepts.filter(function(dept){
                    return dept.id == idSelected;
                });
                this.getView().setModel(new JSONModel(oDept[0]), "mDetails");
            }
            this.getView().byId("iconTabBarSecond").fireSelect();
        },
        _onTabSelect: function(oEvent){
            var sTitle = oEvent.getParameter("selectedItem")
                ? oEvent.getParameter("selectedItem").getText()
                : oEvent.getSource().getItems()[0].getText();
            this.getView().byId("secondPage").setTitle(sTitle);
            var aDivs = this.getView().getModel("mDetails").getProperty("/divisions"),
            aFilteredDivs = aDivs.filter(function(div){
                return div.divisionName === sTitle;
            });
            this.getView().setModel(new JSONModel(aFilteredDivs[0]), "mDivision");
        },
        _onSecondPageNavButtonPress: function(){
            var oHistory = History.getInstance(),
            sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("first", true);
			}
        }

    } );
} );
