sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"task/test/integration/pages/SuppliersList",
	"task/test/integration/pages/SuppliersObjectPage",
	"task/test/integration/pages/ProductsObjectPage"
], function (JourneyRunner, SuppliersList, SuppliersObjectPage, ProductsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('task') + '/test/flp.html#app-preview',
        pages: {
			onTheSuppliersList: SuppliersList,
			onTheSuppliersObjectPage: SuppliersObjectPage,
			onTheProductsObjectPage: ProductsObjectPage
        },
        async: true
    });

    return runner;
});

