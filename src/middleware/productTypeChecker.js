const patchProductTypeChecker = (req, res, next) => {
    const { name, price } = req.body;

    if (name === undefined && price === undefined) {
        return res.status(400).json({
            error: "At least one field (name or price) is required to update"
        });
    }

    if (name !== undefined && typeof name !== "string") {
        return res.status(400).json({
            error: "name must be a string"
        });
    }

    if (price !== undefined && typeof price !== "number") {
        return res.status(400).json({
            error: "price must be a number"
        });
    }

    next();
};

const productTypeChecker = (req, res, next) => {
    const { id, name, price } = req.body;

    if (typeof id !== "number" || typeof name !== "string" || typeof price !== "number") {
        return res.status(400).json({
            error: "Validation failed: id must be a number, name must be a string, price must be a number"
        });
    }

    next();
};

module.exports = productTypeChecker;
module.exports.patchProductTypeChecker = patchProductTypeChecker;