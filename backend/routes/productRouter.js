const express = require("express");
const { getAllProducts,addProducts, updateProduct, deleteProduct, productDetails } = require("../controllers/productController");

const router = express.Router();
// Add Product -- Admin
router.route("/products/new").post(addProducts)
router.route("/products/:id").put(updateProduct).delete(deleteProduct).get(productDetails)
router.route("/products").get(getAllProducts);


module.exports= router;