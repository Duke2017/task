sap.ui.define(['jquery.sap.global'],
	function(jQuery) {
	"use strict";

	var DemoPersoService = {

		getPersData : function () {
			var oDeferred = new jQuery.Deferred();
			oDeferred.resolve();
			return oDeferred.promise();
		},

		setPersData : function (oBundle) {
			var oDeferred = new jQuery.Deferred();
			oDeferred.resolve();
			return oDeferred.promise();
		},

		delPersData : function () {
			var oDeferred = new jQuery.Deferred();
			oDeferred.resolve();
			return oDeferred.promise();
		}
	};

	return DemoPersoService;

}, /* bExport= */ true);