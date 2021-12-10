// require the database connection
const productRepository = require("../repositories/productRepository.js");

const productValidator = require("../validators/productValidators.js");

// Function to get all products
//
function getProducts() {
  // Call the repository function to get all products
  const products = productRepository.getProducts();

  // return products
  return products;
}

// Function to get product by id
//
function getProductById(id) {
  // validate the id
  if (productValidator.validateId(id, { no_symbols: true })) {
    // Call the repository function to get product matching id
    const product = productRepository.getProductById(id);

    // return the product
    return product;
  } else {
    return "Invalid product id";
  }
}

// Function to get product by id
//
function getProductsByCatId(id) {
  // validate the id
  if (productValidator.validateId(id, { no_symbols: true })) {
    // Call the repository function to get product matching id
    const products = productRepository.getProductsByCatId(id);

    // return the product
    return products;
  } else {
    return "Invalid category id";
  }
}

// Validate data and insert a new product
// This function accepts product data as a paramter from the controller.
async function addOrUpdateProduct(productForm) {
  // declare variables
  let result;
  
  // Call the product validator - kept seperate to avoid clutter here
  let validatedProduct = productValidator.validateProduct(productForm); 
  
  // If validation returned a product object - save to database
  if (validatedProduct != null) {

    // insert or update?
    if (validatedProduct._id == 0) {
      // Insert
      result = await productRepository.insertProduct(validatedProduct);
    } else {
      // update
      result = await productRepository.updateProduct(validatedProduct);
    }

  } else {
    // Product data failed validation
    result = { result: "error - invalid product" }; // log the result

    console.log("productService.createProduct(): form data validate failed");
  } // return the newly inserted product
  return result;
}

// Function to delete product by id
//
function deleteProduct(id) {
  // validate the id
  if (productValidator.validateId(id, { no_symbols: true })) {
    // Call the repository function to get product matching id
    const result = productRepository.deleteProductById(id);

    // return the result
    return result;

  } else {
    return {"result" : "Error:Invalid product id"};
  }
}

// Module exports
// expose these functions
module.exports = {
  getProducts,
  getProductById,
  getProductsByCatId,
  addOrUpdateProduct,
  deleteProduct
};
