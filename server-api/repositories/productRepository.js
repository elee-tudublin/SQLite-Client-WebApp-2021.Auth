// Dependencies
// require the database connection
const { dbConn } = require('../database/db.js');

// Define SQL statements here for use in function below
// These are parameterised queries.
// Input parameters are parsed and set before queries are executed
// Better sqlite3 doc:
// https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#class-statement

// Parameterised Queries
const SQL_PRODUCT_ALL = 'SELECT * FROM product ORDER BY product_name ASC;';
const SQL_PRODUCT_BYID = 'SELECT * FROM product WHERE _id = ?;';
const SQL_PRODUCT_BY_CATID = 'SELECT * FROM product WHERE category_id = ? ORDER BY product_name ASC;'; 
const SQL_INSERT = 'INSERT INTO product (category_id, product_name, product_description, product_stock, product_price) VALUES (@cat_id, @name, @description, @stock, @price);';
const SQL_UPDATE = 'UPDATE product SET category_id = @cat_id, product_name = @name, product_description = @description, product_stock = @stock, product_price = @price WHERE _id = @id;';
const SQL_DELETE = 'DELETE FROM product WHERE _id = ?;';
// Get all products from DB
//
function getProducts() {

    // define variable to store products
    let products;

    // execute SQL
    // Note await in try/catch block
    try {
        // Execute the SQL
        const result = dbConn.prepare(SQL_PRODUCT_ALL)
        
        // first element of the recordset contains products
        products = result.all();

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get all products: ', err.message);
    } finally {

    }
    // return all products found
    return products;
}

// better-sqlite params
// https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#allbindparameters---array-of-rows

// Get product by id from DB
//
function getProductById(id) {
    let product;

    // execute SQL
    // Note await in try/catch block
    try {
        // Execute the SQL
        const result = dbConn.prepare(SQL_PRODUCT_BYID)
        
        // set id parameter value
        product = result.get(id);

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get all products: ', err.message);
    } finally {

    }
    // return a single product if found
    return product;
}

// Get products from DB by cat id
//
function getProductsByCatId(catId) {

    // define variable to store products
    let products;

    // execute SQL
    // Note await in try/catch block
    try {
        // Execute the SQL
        const result = dbConn.prepare(SQL_PRODUCT_BY_CATID)
        
        // first element of the recordset contains products
        products = result.all(catId);

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get all products: ', err.message);
    } finally {

    }
    // return all products found
    return products;
}

// Insert a new product and return it
//
function insertProduct(product) {
    let newProduct;

    // execute SQL
    try {
        // Prepare the SQL satement
        const insert = dbConn.prepare(SQL_INSERT)

        // set the sql paramaters and execute
        const result = insert.run({
            cat_id: product.category_id, 
            name: product.product_name, 
            description: product.product_description, 
            stock: product.product_stock, 
            price: product.product_price
        });

        // Get the newly inserted product, using lastInsertRowid
        newProduct = getProductById(result.lastInsertRowid);

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get all products: ', err.message);
    } finally {

    }
    // return the new product
    return newProduct;
}

// Update a product and return it
//
function updateProduct(product) {

    let result;
    // execute SQL
    try {
        // Prepare the SQL satement
        const update = dbConn.prepare(SQL_UPDATE);

        // set the sql paramaters and execute
        result = update.run({
            id: product._id,
            cat_id: product.category_id, 
            name: product.product_name, 
            description: product.product_description, 
            stock: product.product_stock, 
            price: product.product_price
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - update product: ', err.message);
    } finally {

    }
    // return the query result (rows updated)
    return result.changes;
}

// Delete product by id from DB
//
function deleteProductById(id) {
    let result;

    // execute SQL
    // Note await in try/catch block
    try {
        // Execute the SQL
        const deleteProduct = dbConn.prepare(SQL_DELETE)
        
        // set id parameter value
        result = deleteProduct.run(id);
        console.log('delete result: ', result.changes);

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - delete: ', err.message);
    } finally {

    }

    // return the query result
    return result.changes;
}

// Export 
module.exports = {
    getProducts,
    getProductById,
    getProductsByCatId,
    insertProduct,
    updateProduct,
    deleteProductById
};
