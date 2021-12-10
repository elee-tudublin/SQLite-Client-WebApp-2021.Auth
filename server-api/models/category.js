// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Using_a_constructor_function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/default_parameters

function Category(id = null, name, desc, productRefs) {

    this._id = id;
    this.category_name = name;
    this.category_description = desc;
    this.category_products = productRefs;

};

module.exports = Category;