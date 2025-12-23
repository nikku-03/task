namespace com.capm;

using {managed} from '@sap/cds/common';

// @odata.draft.enabled
entity Products :  managed {
    key ID: String;
    @mandatory name        : String(100);
    @mandatory description : String(500);
    @mandatory price       : Decimal(10,2);
    @mandatory stock       : Integer;
    category    : String(50);
    supplier    : Association to Suppliers;
}

// @odata.draft.enabled
entity Suppliers :managed {
    key ID: String;
    @mandatory name    : String(100);
    @mandatory email   : String(100);
    @mandatory phone   : String(20);
    address : String(200);
    products : Association to many Products on products.supplier = $self;
}

@odata.draft.enabled
entity Orders :  managed {
    Key ID: String;
    @mandatory orderNumber : String(20);
    @mandatory orderDate   : Date;
    @mandatory totalAmount : Decimal(12,2);
    status      : String(20);
    items       : Composition of many OrderItems on items.order = $self;
}

entity OrderItems :managed {
    Key ID: String;
    order    : Association to Orders;
    product  : Association to Products;
    @mandatory quantity : Integer;
    @mandatory price    : Decimal(10,2);
}

// // Authorization Annotations - GRANT Permissions
// annotate Products with @(restrict: [
//     { grant: ['READ'], to: 'Viewer' },
//     { grant: ['*'], to: 'Admin' }
// ]);

// annotate Suppliers with @(restrict: [
//     { grant: ['READ'], to: 'Viewer' },
//     { grant: ['*'], to: 'Admin' }
// ]);

// annotate Orders with @(restrict: [
//     { grant: ['READ'], to: 'Viewer' },
//     { grant: ['*'], to: 'Admin' }
// ]);

// annotate OrderItems with @(restrict: [
//     { grant: ['READ'], to: 'Viewer' },
//     { grant: ['*'], to: 'Admin' }
// ]);