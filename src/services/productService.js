const { readProducts, writeProducts } = require("../database/productDatabase");

const store = {};

const simulateDelay = async () => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    return readProducts();
};

const deleteProduct = async (id) => {
    const allProducts = await readProducts();
    const idx = allProducts.findIndex((entry) => entry.id == id);

    if (idx === -1) {
        return null;
    }

    const removed = allProducts.splice(idx, 1)[0];
    await writeProducts(allProducts);
    Object.keys(store).forEach((k) => delete store[k]);
    return removed;
};

const patchProduct = async (id, product) => {
    const allProducts = await readProducts();
    const idx = allProducts.findIndex((entry) => entry.id == id);

    if (idx === -1) {
        return null;
    }

    allProducts[idx] = { ...allProducts[idx], ...product };
    await writeProducts(allProducts);
    Object.keys(store).forEach((k) => delete store[k]);
    return allProducts[idx];
};

const updateProduct = async (id, product) => {
    const allProducts = await readProducts();
    const idx = allProducts.findIndex((entry) => entry.id == id);

    if (idx === -1) {
        return null;
    }

    allProducts[idx] = { ...product, id: allProducts[idx].id };
    await writeProducts(allProducts);
    Object.keys(store).forEach((k) => delete store[k]);
    return allProducts[idx];
};

const createProduct = async (product) => {
    const allProducts = await readProducts();
    allProducts.push(product);
    await writeProducts(allProducts);
    Object.keys(store).forEach((k) => delete store[k]);
    return product;
};

const getProductById = async (id) => {
    const cacheKey = `/products/${id}`;

    if (store[cacheKey]) {
        return store[cacheKey];
    }

    const allProducts = await simulateDelay();
    const match = allProducts.filter((entry) => entry.id == id);
    store[cacheKey] = match;
    return match;
};

const getProducts = async () => {
    const cacheKey = "/products";

    if (store[cacheKey]) {
        return store[cacheKey];
    }

    const allProducts = await simulateDelay();
    store[cacheKey] = allProducts;
    return allProducts;
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct };
