const express=require('express');
var router=express.Router();
const productControllers=require('../controllers/products')
router.get("/",productControllers.getProducts);

module.exports=router;