const Product = require("../models/product.model")

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const page = req.query.page === undefined
            ? 1
            : Number(req.query.page);

        const limit = req.query.limit === undefined
            ? 10
            : Number(req.query.limit);

        // Check Inavalid Page
        if (!Number.isInteger(page) || page <= 0) {
            return res.status(400).json({
                success: false,
                message: "The Page is Invalid.!"
            })
        }

        // Check Invalid Limit
        if (
            !Number.isInteger(limit) ||
            limit <= 0 ||
            limit >= 100
        ) {
            return res.status(400).json({
                success: false,
                message: "The Invalid Limit.!"
            });
        };

        // Filter the product
        const { category, search, sort_by_stock } = req.query;

        const query = {};

        if (category) {
            query.category = {
                $regex: category,
                $options: "i"
            }
        }
        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        };

        if (sort_by_stock === "in-stock") {
            query.stock = { $gt: 5 }
        }

        if (sort_by_stock === "low-stock") {
            query.stock = { $lte: 5, $gt: 0 }
        }

        if (sort_by_stock === "out-of-stock") {
            query.stock = 0
        }

        // Sort by Price
        const sort = req.query.sort;

        let sorting = {};

        if (sort === "price_asc") {
            sorting = {
                ...sorting,
                price: 1
            }
        }
        if (sort === "price_desc") {
            sorting = {
                ...sorting,
                price: -1
            }
        };

        // Count the product and page
        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        const skip = (page - 1) * limit;

        // Fetch the products
        const products = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .sort(sorting)

        res.status(200).json({
            success: true,
            page,
            totalProducts,
            totalPages,
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error.!"
        });
    };
};

// Get Single Product
const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.!"
        });
    }
};

// Create Products
const createProducts = async (req, res) => {
    try {
        const {
            title,
            category,
            price,
            stock
        } = req.body;

        const product = await Product.create({
            title,
            category,
            price,
            stock
        });

        if (!title) {
            res.status(400).json({
                message: "Must be a valid title."
            });
        };

        if (!category) {
            res.status(400).json({
                message: "Must be a valid category."
            });
        };

        if (price < 0) {
            res.status(400).json({
                message: "Must be a valid price."
            });
        };

        if (stock < 0) {
            res.status(400).json({
                message: "Must be a valid stock."
            });
        };

        if (!product) {
            res.status(400).json({
                success: false,
                message: "Failed to create product."
            });
        };

        res.status(201).json({
            success: true,
            message: "Product created successful."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.!"
        });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { title, category, price, stock } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                title,
                category,
                price,
                stock
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );
        if (!updatedProduct) {
            res.status(400).json({
                success: false,
                message: "Something wrong bad request."
            });
        };

        res.status(200).json({
            success: true,
            message: "Product updated successful."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    };
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            res.status(400).json({
                success: false,
                message: "Failed to product delete."
            })
        }

        res.status(200).json({
            success: true,
            product,
            message: 'Product deleted successful.'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.!"
        })
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProducts,
    updateProduct,
    deleteProduct
};