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
    req.user.getCart()
    .then((cart)=>console.log(cart)).catch((err)=>console.log(err))
    // const cart=Cart.fetchAll();
    // Product.fetchAll(([rows,field])=>{
    //     res.render('shop/cart',{cart,products:rows,path:'/cart',pageTitle:'cart'})
    // })  
}
exports.postCart=(req,res,next)=>{
    let prodId=req.body.productId;
    let fetchedCart;
    req.user.getCart()
    .then((cart=>{
        fetchedCart=cart;
        return cart.getProducts({where:{id:prodId}});
    }))
    .then((products)=>{
        let product;
        if(products.length>0){
            product=products[0];
        }
        let newQuantity=1;
        if(product){

        }
        return Product.findByPk(prodId)
        .then((product)=>{
            return fetchedCart.addProduct(product,
                { through:{quantity:newQuantity}
            });
        })
        .catch(err=>console.log(err));
    })
    .then(()=>{
        res.redirect('/cart');
    })
    .catch(err=>console.log(err));
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