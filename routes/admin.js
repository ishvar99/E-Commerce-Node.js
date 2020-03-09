const express=require('express')
const productControllers=require('../controllers/products')
var router=express.Router();

router.get('/add-product',productControllers.getAddProduct)
router.post('/add-product',productControllers.postAddProduct)

module.exports=router;