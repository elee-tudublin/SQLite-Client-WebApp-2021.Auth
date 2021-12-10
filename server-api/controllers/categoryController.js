// Import router package
const router = require("express").Router();
const categoryService = require("../services/categoryService.js");

/* Handle get requests for '/'
/* this is the index or home page
*/
router.get("/", async(req, res) => {
  // Get all products
  try {
    // call the service
    const result = await categoryService.getCategories();

    // Send response back to client
    res.json(result);

    // Catch and send errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});


// export
module.exports = router;
