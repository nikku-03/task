using com.capm as db from '../db/schema';

@requires: 'authenticated-user'
@restrict: [
    { grant: 'READ', to: 'Viewer' },
    { grant: '*', to: 'Admin' }
]
service CatalogService @(path: '/catalog') {

    @odata.draft.enabled
    entity Products as projection on db.Products;

    @odata.draft.enabled
    entity Suppliers as projection on db.Suppliers;

    entity Orders as projection on db.Orders;

    entity OrderItems as projection on db.OrderItems;

    // Northwind Function
    function getNorthwind() returns LargeString;

    // Actions
    action approveOrder(orderId: UUID) returns String;
    action cancelOrder(orderId: UUID) returns String;
}
