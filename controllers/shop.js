const Product=require('../models/product');
const Cart=require('../models/cart');


exports.getProducts=(req,res,next)=>{
    // res.sendFile(path.join(rootDir,'..','views','shop.html'));
    Product.fetchAll().then(([rows,field])=>{
        res.render('shop/products-list',{products:rows,path:'/products',pageTitle:'shop'});
    }).catch(err=>console.log(err))
}
exports.getProduct=(req,res,next)=>{
    let prodId=req.params.productId;
    Product.findById(prodId).then(([product])=>{
        res.render("shop/product-details",{product:product[0],pageTitle:product.title,path:'/product-details'})
    })
    .catch(err=>console.log(err));
}
exports.getIndex=(req,res,next)=>{
    Product.fetchAll().then(([rows,field])=>{
        res.render('shop/index',{products:rows,path:'/',pageTitle:'index'});
    }).catch(err=>console.log(err))
   
}

exports.getCart=(req,res,next)=>{

    const cart=Cart.fetchAll();
    Product.fetchAll(([rows,field])=>{
        res.render('shop/cart',{cart,products:rows,path:'/cart',pageTitle:'cart'})
    })
   
}
exports.postCart=(req,res,next)=>{
    let prodId=req.body.productId;
    Product.findById(prodId).then(([product])=>{
        Cart.addProduct(product[0].id,product[0].price);
    })
    .catch(err=>console.log(err));
    // product=>{
    //     
    // }
    res.redirect('/cart');
}
exports.postDeleteCart=(req,res,next)=>{
    let prodId=req.body.productId;
    // Product.findById(prodId,product=>{
    //     Cart.deleteProduct(product.id,product.price);
    // });
    res.redirect('/cart');
}
exports.getOrders=(req,res,next)=>{
    res.render('shop/orders',{path:'/orders',pageTitle:'orders'})
}
exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{path:'/checkout',pageTitle:'checkout'})
}