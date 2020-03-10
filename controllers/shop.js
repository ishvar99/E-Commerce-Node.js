const Product=require('../models/product');
exports.getProducts=(req,res,next)=>{
    // res.sendFile(path.join(rootDir,'..','views','shop.html'));
    const products=Product.fetchAll();
    res.render('shop/products-list',{products,path:'/products',pageTitle:'shop'});
}
exports.getIndex=(req,res,next)=>{
    const products=Product.fetchAll();
    res.render('shop/index',{products,path:'/',pageTitle:'index'});
}

exports.getCart=(req,res,next)=>{
    res.render('shop/cart',{path:'/cart',pageTitle:'cart'})
}
exports.getOrders=(req,res,next)=>{
    res.render('shop/orders',{path:'/orders',pageTitle:'orders'})
}
exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{path:'/checkout',pageTitle:'checkout'})
}