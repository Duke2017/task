sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";
    return Controller.extend( "test.controller.first", {
        onInit: function() {
            this.getView().setModel(this.getOwnerComponent().mDepts, "mView");
            this.aTableItems = this.getView().byId("firstTable").getBinding("items");
            this._addSearchField();
        },
        onItemPress: function(oEvent) {
            var idSelected = oEvent.getParameter("listItem").data("id");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("second", {selected: idSelected});
        },
        _onSearch: function(oEvent) {
            var oFilterBar = oEvent.getSource(), aFilters = [],
            aItems = oFilterBar.getAllFilterItems(true);
            aItems.forEach(function(item) {
                var oControl = item.getControl();
                var sName = item.getName();
                var sValue = oControl.getValue();
                if (sValue) {
                    aFilters.push( new Filter(sName, FilterOperator.Contains, sValue ) );
                }
            });
            this.aTableItems.filter(aFilters);
        },
        _onClear: function(oEvent) {
            var oFilterBar = oEvent.getSource(), aItems = oFilterBar.getAllFilterItems(true);
			for (var i = 0; i < aItems.length; i++) {
				var oControl = oFilterBar.determineControlByFilterItem(aItems[i]);
				if (oControl) {
					oControl.setValue("");
				}
			}
        },
        _addSearchField: function() {
            var _oFilterBar = this.getView().byId("firstFilterBar"),
            oSearchField = _oFilterBar.getBasicSearch();
			if (!oSearchField) {
				this._oBasicSearch = new sap.m.SearchField({
					showSearchButton: true,
					search:[this.onSearchPressed, this]
				});
				_oFilterBar.setBasicSearch(this._oBasicSearch);
			}
        },
        onSearchPressed: function() {
            var sSearchTerm = this._oBasicSearch.getValue(), oFilter;
            if (sSearchTerm && sSearchTerm.length) {
                oFilter = new Filter({
                    filters: [
                        new Filter("name", FilterOperator.Contains, sSearchTerm),
                        new Filter("city", FilterOperator.Contains, sSearchTerm)
                    ],
                    and: false
                });
            }
            this.aTableItems.filter(oFilter);
        }

    } );
} );
