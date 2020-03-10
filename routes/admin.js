const express=require('express')
const adminControllers=require('../controllers/admin')
var router=express.Router();

router.get('/add-product',adminControllers.getAddProduct)
router.get('/products',adminControllers.getProducts)
router.post('/add-product',adminControllers.postAddProduct)
module.exports=router;