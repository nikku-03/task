const cds = require('@sap/cds');
const axios = require('axios');

module.exports = cds.service.impl(async function () {

    const { Products, Suppliers, Orders, OrderItems } = this.entities;

    /* ==================== NORTHWIND FUNCTION ==================== */
    this.on('getNorthwind', async () => {
        const result = await axios.get(
            'https://services.odata.org/northwind/northwind.svc/Products?$format=json'
        );
        return JSON.stringify(result.data); // returns LargeString
    });

    /* ==================== CREATE VALIDATIONS ==================== */
    this.before('CREATE', Products, async (req) => {
        if (req.data.price <= 0) req.error(400, 'Price must be greater than 0');
        if (req.data.stock < 0) req.error(400, 'Stock cannot be negative');
    });

    this.before('CREATE', Suppliers, async (req) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.data.email)) req.error(400, 'Invalid email format');
    });

    this.before('CREATE', Orders, async (req) => {
        if (!req.data.status) req.data.status = 'NEW';
        if (req.data.totalAmount <= 0) req.error(400, 'Total amount must be greater than 0');
    });

    this.before('CREATE', OrderItems, async (req) => {
        if (req.data.quantity <= 0) req.error(400, 'Quantity must be greater than 0');
        if (req.data.price <= 0) req.error(400, 'Price must be greater than 0');
    });

    /* ==================== DELETE VALIDATIONS ==================== */
    this.before('DELETE', Products, async (req) => {
        const orderItems = await SELECT.from(OrderItems).where({ product_ID: req.data.ID });
        if (orderItems.length > 0) req.error(400, 'Cannot delete product referenced in orders');
    });

    this.before('DELETE', Suppliers, async (req) => {
        const products = await SELECT.from(Products).where({ supplier_ID: req.data.ID });
        if (products.length > 0) req.error(400, 'Cannot delete supplier with products');
    });

    this.before('DELETE', Orders, async (req) => {
        await DELETE.from(OrderItems).where({ order_ID: req.data.ID });
    });

    /* ==================== ACTIONS ==================== */
    this.on('approveOrder', async (req) => {
        const { orderId } = req.data;
        const order = await SELECT.one.from(Orders).where({ ID: orderId });
        if (!order) req.error(404, 'Order not found');
        await UPDATE(Orders).set({ status: 'APPROVED' }).where({ ID: orderId });
        return `Order ${order.orderNumber} approved successfully`;
    });

    this.on('cancelOrder', async (req) => {
        const { orderId } = req.data;
        const order = await SELECT.one.from(Orders).where({ ID: orderId });
        if (!order) req.error(404, 'Order not found');
        await UPDATE(Orders).set({ status: 'CANCELLED' }).where({ ID: orderId });
        return `Order ${order.orderNumber} cancelled successfully`;
    });

});
