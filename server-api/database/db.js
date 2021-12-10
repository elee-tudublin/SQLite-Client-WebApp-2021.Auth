const Database = require('better-sqlite3');
const dbConn = new Database('./database/productDB.db', { verbose: console.log });

// https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md


// export the database connection object
module.exports = {
    dbConn
};