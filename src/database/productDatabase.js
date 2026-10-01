const fs = require("fs/promises");
const path = require("path");

const dbFilePath = path.join(__dirname, "../db/db.json");

const writeProducts = async (products) => {
    await fs.writeFile(dbFilePath, JSON.stringify(products, null, 4));
};

const readProducts = async () => {
    const fileData = await fs.readFile(dbFilePath, "utf-8");
    return JSON.parse(fileData);
};

module.exports = { readProducts, writeProducts };
