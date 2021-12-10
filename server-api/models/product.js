// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Using_a_constructor_function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/default_parameters

function Product(id = null, cat = null, name, desc, stock, price) {

    this._id = id;
    this.category_id = cat;
    this.product_name = name;
    this.product_description = desc;
    this.product_stock = stock;
    this.product_price = price;
}

module.exports = Product;