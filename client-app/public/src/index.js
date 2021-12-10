// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from "./fetchAPIHelper.js";
import { Product } from "./models/product.js";
import { API_ROLES } from "./auth/auth0-variables.js";
import { checkAuth } from "./auth/jwtAuth.js";

// 1. Parse JSON
// 2. Create category links
// 3. Display in web page
//
function displayCategories(categories) {
  // Use the Array map method to iterate through the array of categories (in json format)
  const catLinks = categories.map((cat) => {
    // return a link button for each category, setting a data attribute for the id
    // the data attribute is used instead of id as an id value can only be used once in the document
    // note the category-link class used to identify the buttons
    return `<button data-category_id="${cat._id}" class="list-group-item list-group-item-action category-link">
              ${cat.category_name}
            </button>`;
  });

  // Add a link for all products to start of array
  if (Array.isArray(catLinks)) {
    catLinks.unshift(`<button data-category_id="0" 
                        class="list-group-item list-group-item-action category-link">
                        All Products
                      </button>`);
  }

  // Set the innerHTML of the productRows root element = rows
  // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)
  document.getElementById("categoryList").innerHTML = catLinks.join("");

  // Add Event listeners
  //
  // 1. Find button all elements with matching class name
  const catButtons = document.getElementsByClassName("category-link");

  // 2. Assign a 'click' event listener to each button
  // Both arrays have same length so only need 1 loop
  for (let i = 0; i < catButtons.length; i++) {
    catButtons[i].addEventListener("click", filterProducts);
  }

  //
  // *** Fill select list in product form ***
  // first get the select input by its id
  let catSelect = document.getElementById("category_id");

  // remove any existing options from the select
  // loop and keep deleting until no first item/ child remaining
  while (catSelect.firstChild) catSelect.removeChild(catSelect.firstChild);

  // Add a select option for each category
  // iterate through categories adding each to the end of the options list
  // each option is made from categoryName, categoryId
  // Start with default option
  catSelect.add(new Option("Choose a category", "0"));
  for (let i = 0; i < categories.length; i++) {
    catSelect.add(new Option(categories[i].category_name, categories[i]._id));
  }
} // end function

// 1. Parse JSON
// 2. Create product rows
// 3. Display in web page
//
function displayProducts(products) {
  // check user permissions
  // Does the token contain these roles?
  const showUpdate = checkAuth(API_ROLES.UPDATE_PRODUCT);
  const showDelete = checkAuth(API_ROLES.DELETE_PRODUCT);
  const showAdd = checkAuth(API_ROLES.CREATE_PRODUCT);


  // Show button if user has permission to add products
  if (showAdd) {
    document.getElementById("AddProductButton").style.display = "block";
  } else {
    document.getElementById("AddProductButton").style.display = "none";
  }

  // Use the Array map method to iterate through the array of products (in json format)

  const rows = products.map((product) => {
    // returns a template string for each product, values are inserted using ${ }
    // <tr> is a table row and <td> a table division represents a column
    // product_price is converted to a Number value and displayed with two decimal places
    // icons - https://icons.getbootstrap.com/
    let row = `<tr>
                <td>${product._id}</td>
                <td>${product.product_name}</td>
                <td>${product.product_description}</td>
                <td>${product.product_stock}</td>
                <td class="price">&euro;${Number(product.product_price).toFixed(
                  2
                )}</td>`;

    // if user has permission to update - add the edit button
    if (showUpdate) {
      row += `<td><button data-product_id="${product._id}" 
                  class="btn btn-sm btn-outline-primary btn-update-product" 
                  data-bs-toggle="modal" data-bs-target="#ProductFormDialog" >
                  <span class="bi bi-pencil-square" 
                  data-toggle="tooltip" title="Edit Product">
                  </span></button>`;
    }
    // if user has permission to delete - add the delete button
    if (showDelete) {
      row += `</td>
                <td><button data-product_id="${product._id}" 
                  class="btn btn-sm btn-outline-danger btn-delete-product">
                  <span class="bi bi-trash" data-toggle="tooltip" 
                  title="Delete Product">
                  </span></button>
              </td>`;
    }

    row += "</tr>";

    return row;
  });
  // Set the innerHTML of the productRows root element = rows
  // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)
  document.getElementById("productRows").innerHTML = rows.join("");

  // Add Event listeners
  //
  // 1. Find button all elements with matching class name for update and delete
  const updateButtons = document.getElementsByClassName("btn-update-product");
  const deleteButtons = document.getElementsByClassName("btn-delete-product");

  // 2. Assign a 'click' event listener to each button
  // Both arrays have same length so only need 1 loop
  if(showUpdate) {
    for (let i = 0; i < updateButtons.length; i++) {
      updateButtons[i].addEventListener("click", prepareProductUpdate);
    } 
  }
  if(showDelete) {
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", deleteProduct);
    } 
  }
} // end function

//
// Filter products by category
//
async function filterProducts() {
  // Get id of cat link (from the data attribute)
  // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
  const catId = Number(this.dataset.category_id);

  // validation - if 0 or NaN reload everything
  if (isNaN(catId) || catId == 0) {
    loadProducts();

    // Otherwise get products in this category
  } else {
    // Get products using the fetchAPIHelper function
    const products = await api.getDataAsync(
      `${api.BASE_URL}/product/bycat/${catId}`
    );

    // If products returned then display them
    if (Array.isArray(products)) {
      displayProducts(products);
    }
  }
}

//
// Get all categories and products then display
//
async function loadProducts() {
  // Get categories using the fetchAPIHelper function
  const categories = await api.getDataAsync(`${api.BASE_URL}/category`);

  // If products returned then display them
  if (Array.isArray(categories)) {
    displayCategories(categories);
  }

  // Get products using the fetchAPIHelper function
  const products = await api.getDataAsync(`${api.BASE_URL}/product`);

  // If products returned then display them
  if (Array.isArray(products)) {
    displayProducts(products);
  }
}

// Fill the product form when an edit button is clicked
//
async function prepareProductUpdate() {
  try {
    // 1. Get product by id
    // this.id is the id of the button element which called this function
    const product = await api.getDataAsync(
      `${api.BASE_URL}/product/${this.dataset.product_id}`
    );

    // 2. Set form defaults
    // first param sets event
    productFormSetup(0, `Update Product ID: ${product._id}`);

    // Fill out the form
    document.getElementById("_id").value = product._id; // uses a hidden field - see the form
    document.getElementById("category_id").value = product.category_id;
    document.getElementById("product_name").value = product.product_name;
    document.getElementById("product_description").value =
      product.product_description;
    document.getElementById("product_stock").value = product.product_stock;
    document.getElementById("product_price").value = product.product_price;
  } catch (err) {
    console.log(err);
  }
}

// Get values from product form
// Create new Product and return
function getProductForm() {
  // new Product object constructed from the form values
  // Note: These should be validated!!
  return new Product(
    // read the form values and pass to the Product constructor
    document.getElementById("_id").value,
    document.getElementById("category_id").value,
    document.getElementById("product_name").value,
    document.getElementById("product_description").value,
    document.getElementById("product_stock").value,
    document.getElementById("product_price").value
  );
} // End function

//
// Called when add product form is submitted
async function addOrUpdateProduct() {
  // url for api call
  const url = `${api.BASE_URL}/product`;
  // New product = POST, Update = PUT or PATCH
  let httpMethod = "POST";

  // Get the form data
  const formProduct = getProductForm();
  // log to console
  console.log("%cNew Product: ", "color: green", formProduct);

  // Check if new product or update
  // Only existing products have formProduct._id > 0
  if (formProduct._id > 0) {
    httpMethod = "PUT";
  }

  // use fetchInit to build the request
  const request = api.fetchInit(httpMethod, JSON.stringify(formProduct));

  try {
    // Call fetch and await the respose
    // fetch url using request object
    const result = await api.getDataAsync(url, request);

    // Output result to console (for testing purposes)
    console.log(result);

    // catch and log any errors
  } catch (err) {
    console.log(err);
    return err;
  }

  // Refresh products list
  loadProducts();
} // End function

// Delete product by id using an HTTP DELETE request
async function deleteProduct() {
  // url for delete product endpoint
  const url = `${api.BASE_URL}/product/${this.dataset.product_id}`;
  console.log("delete url ", url);

  // Build the HTTP request object (set delete method)
  const request = api.fetchInit("DELETE");

  // Confirm delete
  if (confirm("Are you sure?")) {
    try {
      // call the api and get a result
      const result = await api.getDataAsync(url, request);

      if (Number(result) === 1)
        // if success (true result), refresh products list
        loadProducts();

      // catch and log any errors
    } catch (err) {
      console.log(err);
      return err;
    }
  }
} // End Function

//
// Setup product form
// event is asigned by by click etc.
function productFormSetup(event, formTitle = "Add Product") {
  // reset the form and change the title
  document.getElementById("productForm").reset();
  document.getElementById("productFormTitle").innerText = formTitle;

  // form reset doesn't work for hidden inputs!!
  // do this to rreset previous id if set
  document.getElementById("_id").value = 0;
} // End function

export { loadProducts, productFormSetup, prepareProductUpdate };

// Add event listener to the Add Product Button
document
  .getElementById("AddProductButton")
  .addEventListener("click", productFormSetup);

// Add event listner to form submit/ save button
document
  .getElementById("formSubmit")
  .addEventListener("click", addOrUpdateProduct);

// load and display products when this script is first loaded
loadProducts();
