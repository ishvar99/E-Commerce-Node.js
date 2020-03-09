const Product=require('../models/product');
exports.getAddProduct=(req,res,next)=>{
    // res.sendFile(path.join(rootDir,'..','views','add-product.html'))
    res.render('add-product',{path:'/admin/add-product',pageTitle:"admin"})
}
exports.postAddProduct=(req,res,next)=>{  
    const product=new Product(req.body.title);
    product.save();
    res.redirect('/');
}
exports.getProducts=(req,res,next)=>{
    // res.sendFile(path.join(rootDir,'..','views','shop.html'));
    const products=Product.fetchAll();
    res.render('shop',{products,path:'/admin/shop',pageTitle:'shop'});
}