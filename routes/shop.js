const express=require('express');
var router=express.Router();
const shopControllers=require('../controllers/shop')
router.get("/",shopControllers.getIndex);
router.get("/products",shopControllers.getProducts);
router.get("/products/:productId",shopControllers.getProduct);
router.get("/cart",shopControllers.getCart);
router.get("/orders",shopControllers.getOrders);
router.get("/checkout",shopControllers.getCheckout);
router.post('/cart',shopControllers.postCart)
module.exports=router;