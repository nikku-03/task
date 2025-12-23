using { Northwind } from './external/Northwind.csn';
 
service northwindsrv {
 
    @readonly
    entity Products  as projection on Northwind.Products;
 
    @readonly
    entity Customers as projection on Northwind.Customers;
 
    @readonly
    entity Employees as projection on Northwind.Employees;
} 