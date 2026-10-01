const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
} = require("../services/productService");

const removeProduct = async (req, res) => {
    try {
        const result = await deleteProduct(req.params.id);

        if (!result) {
            return res.status(404).json({ error: "No product found with the given id" });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editProduct = async (req, res) => {
    try {
        const result = await patchProduct(req.params.id, req.body);

        if (!result) {
            return res.status(404).json({ error: "No product found with the given id" });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const replaceProduct = async (req, res) => {
    try {
        const result = await updateProduct(req.params.id, req.body);

        if (!result) {
            return res.status(404).json({ error: "No product found with the given id" });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const result = await createProduct(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const result = await getProductById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const result = await getProducts();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllProducts, getProduct, addProduct, replaceProduct, editProduct, removeProduct };