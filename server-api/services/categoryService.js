// require the database connection
const categoryRepository = require('../repositories/categoryRepository.js');

// for documentation see: https://www.npmjs.com/package/validator
const validator = require('validator');

// function to validate an id
// An id is a positive number with no sign (+,-, etc.)
// return Not a number or else cast as Number and return
//
function validateId(num) {
    if (validator.isNumeric(num, { no_symbols: true })) {
        return Number(num);
    }
    return NaN;
}

// Function to get all categories
//
function getCategories() {
    // Call the repository function to get all categories
    const categories = categoryRepository.getCategories();

    // return categories
    return categories;
}

// Module exports
// expose these functions
module.exports = {
    getCategories
}


