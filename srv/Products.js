const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const Products = await cds.connect.to("Products"); 
      srv.on('READ', 'Products', req => Products.run(req.query)); 
}