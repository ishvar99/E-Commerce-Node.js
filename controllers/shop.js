const Product=require('../models/product');
const Cart=require('../models/cart');
exports.getProducts=(req,res,next)=>{
    // res.sendFile(path.join(rootDir,'..','views','shop.html'));
    const products=Product.fetchAll();
    res.render('shop/products-list',{products,path:'/products',pageTitle:'shop'});
}
exports.getProduct=(req,res,next)=>{
    let prodId=req.params.productId;
    const product=Product.findById(prodId,product=>{
        res.render("shop/product-details",{product,pageTitle:product.title,path:'/product-details'})
    });
}
exports.getIndex=(req,res,next)=>{
    const products=Product.fetchAll();
    res.render('shop/index',{products,path:'/',pageTitle:'index'});
}

exports.getCart=(req,res,next)=>{

    const cart=Cart.fetchAll();
    const products=Product.fetchAll();
    res.render('shop/cart',{cart,products,path:'/cart',pageTitle:'cart'})
}
exports.postCart=(req,res,next)=>{
    let prodId=req.body.productId;
    Product.findById(prodId,product=>{
        Cart.addProduct(product.id,product.price);
    });
    res.redirect('/cart');
}
exports.postDeleteCart=(req,res,next)=>{
    let prodId=req.body.productId;
    Product.findById(prodId,product=>{
        Cart.deleteProduct(product.id,product.price);
    });
    res.redirect('/cart');
}
exports.getOrders=(req,res,next)=>{
    res.render('shop/orders',{path:'/orders',pageTitle:'orders'})
}
exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{path:'/checkout',pageTitle:'checkout'})
}