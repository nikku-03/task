sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'task',
            componentId: 'ProductsObjectPage',
            contextPath: '/Suppliers/products'
        },
        CustomPageDefinitions
    );
});