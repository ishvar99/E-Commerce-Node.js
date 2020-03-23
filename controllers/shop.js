const Cart=require('../models/cart');
const Product=require('../models/product');

exports.getProducts=(req,res,next)=>{
    // res.sendFile(path.join(rootDir,'..','views','shop.html'));
    Product.findAll()
    .then((products)=>{
        res.render('shop/products-list',{products,path:'/products',pageTitle:'shop'});
    }).catch(err=>console.log(err))
}
exports.getProduct=(req,res,next)=>{
    let prodId=req.params.productId;
    Product.findAll({where:{id:prodId}})
    .then((products)=>{
        res.render("shop/product-details",{product:products[0],pageTitle:products[0].title,path:'/product-details'})
    })
    .catch(err=>console.log(err));
}
exports.getIndex=(req,res,next)=>{
    Product.findAll()
    .then((products)=>{
        res.render('shop/index',{products,path:'/',pageTitle:'index'});
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