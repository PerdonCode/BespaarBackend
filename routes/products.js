const express = require('express');

const {
    getProducts,
    getProduct,
    getProductsByCategory,
    createProduct,
    deleteProduct,
    updateProduct,
    getFilteredProducts,
    getCountOfFilteredProducts,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.get('/category/:categoryId', getProductsByCategory);

router.post('/', createProduct);

router.delete('/:id', deleteProduct)

router.patch('/:id', updateProduct);
router.post('/filter', getFilteredProducts);
router.post('/filter/count', getCountOfFilteredProducts);

module.exports = router;
