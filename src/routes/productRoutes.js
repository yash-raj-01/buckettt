const express = require("express");
const {
    getAllProducts,
    getProduct,
    addProduct,
    replaceProduct,
    editProduct,
    removeProduct
} = require("../controllers/productController");
const productTypeChecker = require("../middleware/productTypeChecker");
const { patchProductTypeChecker } = require("../middleware/productTypeChecker");

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.post("/products", productTypeChecker, addProduct);
router.put("/products/:id", productTypeChecker, replaceProduct);
router.patch("/products/:id", patchProductTypeChecker, editProduct);
router.delete("/products/:id", removeProduct);

module.exports = router;
