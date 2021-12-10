// for documentation see: https://www.npmjs.com/package/validator
const validator = require("validator");

// models
const Product = require('../models/product.js');

// function to validate an id
// An id is a positive number with no sign (+,-, etc.)
// return Not a number or else cast as Number and return
//
function validateId(num) {
  if (validator.isNumeric(num + '', { no_symbols: true })) {
    return Number(num);
  }
  return NaN;
}

// Validate the body data, sent by the client, for a new product
// formProduct represents the data filled in a form
// It needs to be validated before using in gthe application
function validateProduct(formProduct) {
    // Declare constants and variables
    let validatedProduct;

    // new product has no id
    let productId = 0;

    // debug to console - if no data
    if (formProduct === null) {
      console.log("validateNewProduct(): Parameter is null");
    }

    // Check if id field is included in the form object
    // if yes then assign it to productId
    if (formProduct.hasOwnProperty('_id')) {
      productId = formProduct._id
    }

    // Validate form data for new product fields
    // Creating a product does not need a product id
    // Adding '' to the numeric values makes them strings for validation purposes ()
    // appending + '' to numbers as the validator only works with strings
    if (
  validator.isNumeric(productId + '', { no_symbols: true, allow_negatives: false }) &&
        validateId(formProduct.category_id) && 
        !validator.isEmpty(formProduct.product_name) && 
        !validator.isEmpty(formProduct.product_description) && 
        validator.isNumeric(formProduct.product_stock + '', { no_symbols: true, allow_negatives: false }) && 
        validator.isCurrency(formProduct.product_price + '', { no_symbols: true, allow_negatives: false }))
    {
        // Validation passed
        // create a new Product instance based on Product model object
        // no value for product id (passed as null)
        validatedProduct = new Product(
                productId,
                formProduct.category_id,
                // escape is to sanitize - it removes/ encodes any html tags
                validator.escape(formProduct.product_name),
                validator.escape(formProduct.product_description),
                formProduct.product_stock,
                formProduct.product_price
            );
    } else {
        // debug
        console.log("validateNewProduct(): Validation failed");
    }
    // return new validated product object
    return validatedProduct;
}

// Module exports
// expose these functions
module.exports = {
  validateId,
  validateProduct
};
