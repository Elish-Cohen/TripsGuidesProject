const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');

// כל הסלים
router.get('/', cartController.get);

// סל של משתמש מסוים
router.get('/:id', cartController.getById);

// הוספה לסל
router.post('/', cartController.post);

// עדכון סל מלא
// router.put('/:userId', cartController.put);
router.put('/:userId/:productId', cartController.updateCartItem);

// מחיקת מוצר מסל
router.delete('/:userId/:productId', cartController.deleteProduct);

module.exports = router;
