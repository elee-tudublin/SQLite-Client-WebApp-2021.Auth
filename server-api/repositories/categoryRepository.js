// Dependencies
// require the database connection
const { dbConn } = require('../database/db.js');

// Define SQL statements here for use in function below
// These are parameterised queries.
// Input parameters are parsed and set before queries are executed

// Parameterised Queries
const SQL_CATEGORY_ALL = 'SELECT * FROM category ORDER BY category_name ASC;';

// Get all categories from DB
//
function getCategories() {

    // define variable to store categories
    let categories;

    // execute SQL
    // Note await in try/catch block
    try {
        // Execute the SQL
        const result = dbConn.prepare(SQL_CATEGORY_ALL)
        
        // first element of the recordset contains categories
        categories = result.all();

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get all categories: ', err.message);
    } finally {

    }
    // return all categories found
    return categories;
}

// Export 
module.exports = {
    getCategories
}

