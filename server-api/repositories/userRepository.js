// Dependencies
// require the database connection
const { dbConn } = require('../database/db.js');

// Define SQL statements here for use in function below
// These are parameterised queries.
// Input parameters are parsed and set before queries are executed
// Better sqlite3 doc:
// https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#class-statement

// Parameterised Queries
const SQL_SELECT_ALL = 'SELECT * FROM app_user;';

// for json path, without_array_wrapper - use for single json result
const SQL_SELECT_BY_ID = 'SELECT * FROM app_user WHERE _id = ?;';

const SQL_SELECT_BY_EMAIL = 'SELECT * FROM app_user  WHERE email = ?;';

// Get all users
function getUsers() {

    // define variable to store users
    let users;

    // execute SQL
    // Note await in try/catch block
    try {
        // Execute the SQL
        const result = dbConn.prepare(QL_SELECT_ALL)
        
        // first element of the recordset contains users
        users = result.all();

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get all users: ', err.message);
    } finally {

    }
    // return all users found
    return users;
}

// Get user by id from DB
//
function getUserById(id) {

    let user;

    // execute SQL
    // Note await in try/catch block
    try {
        // Execute the SQL
        const result = dbConn.prepare(SQL_SELECT_BY_ID)
        
        // set id parameter value
        user = result.get(id);

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get user by id: ', err.message);
    } finally {

    }
    // return a single user if found
    return user;
}

// get user by email
//
function getUserByEmail(email) {

    let user;

    // execute SQL
    // Note await in try/catch block
    try {
        // Execute the SQL
        const result = dbConn.prepare(SQL_SELECT_BY_EMAIL)
        
        // set id parameter value
        user = result.get(email);

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get user by email: ', err.message);
    } finally {

    }
    // return a single user if found
    return user;
}


// Export 
module.exports = {
    getUsers,
    getUserById,
    getUserByEmail
};
