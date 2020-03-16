const express=require('express')
const adminControllers=require('../controllers/admin')
var router=express.Router();

router.get('/add-product',adminControllers.getAddProduct)
router.get('/edit-product/:productId',adminControllers.getEditProduct);
router.post('/edit-product',adminControllers.postEditProduct);
router.post('/delete-product',adminControllers.postDeleteProduct);
router.get('/products',adminControllers.getProducts)
router.post('/add-product',adminControllers.postAddProduct);

module.exports=router;