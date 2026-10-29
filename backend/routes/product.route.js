const express = require('express');
const {
    getAllProducts,
    createProducts,
    deleteProduct,
    getSingleProduct,
    updateProduct
} = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.post("/products", authMiddleware, createProducts);
router.patch("/products/:id", authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

module.exports = router;