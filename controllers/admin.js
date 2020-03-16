const Product=require('../models/product');
exports.getAddProduct=(req,res,next)=>{
    // res.sendFile(path.join(rootDir,'..','views','add-product.html'))
    res.render('admin/add-product',{path:'/admin/add-product',pageTitle:"admin add product",editing:false})
}
exports.postAddProduct=(req,res,next)=>{
    const product=new Product(null,req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    product.save();
    res.redirect('/');
}
exports.getEditProduct=(req,res,next)=>{
    let editMode=req.query.edit;
    console.log(editMode)
    const prodId=req.params.productId
    if(!editMode)
        return res.redirect('/')
        Product.findById(prodId,product=>{
            res.render('admin/add-product',{
                pageTitle:'edit product',
                path:'/admin/edit-product',
                editing:Boolean(editMode),
                product
            })
        })
}
exports.postEditProduct=(req,res,next)=>{
    let prodId=req.body.productId;
    console.log(prodId);
    const title=req.body.title;
    const price=req.body.price;
    const imageUrl=req.body.imageUrl;
    const description=req.body.description;
    const updatedProduct=new Product(prodId,title,imageUrl,price,description);
    updatedProduct.save();
    res.redirect('/products');
}
exports.getProducts=(req,res,next)=>{
    const products=Product.fetchAll();
    res.render('admin/products',{products,path:'/admin/products',pageTitle:'admin products'});
}