const Product=require('../models/product');
exports.getAddProduct=(req,res,next)=>{
    // res.sendFile(path.join(rootDir,'..','views','add-product.html'))
    res.render('admin/add-product',{path:'/admin/add-product',pageTitle:"admin add product"})
}
exports.postAddProduct=(req,res,next)=>{  
    const product=new Product(req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    product.save();
    res.redirect('/');
}
exports.getProducts=(req,res,next)=>{
    const products=Product.fetchAll();
    res.render('admin/products',{products,path:'/admin/products',pageTitle:'admin products'});
}