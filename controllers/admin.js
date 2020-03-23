const Product=require('../models/product');
exports.getAddProduct=(req,res,next)=>{
    // res.sendFile(path.join(rootDir,'..','views','add-product.html'))
    res.render('admin/add-product',{path:'/admin/add-product',pageTitle:"admin add product",editing:false})
}
exports.postAddProduct=(req,res,next)=>{
    Product.create({
        title:req.body.title,
        imageUrl:req.body.imageUrl,
        price:req.body.price,
        description:req.body.description
    }).then((result)=>{
        console.log("Product Created!")
        res.redirect('/');
    })
    .catch((err)=>console.log(err));
}
exports.getEditProduct=(req,res,next)=>{
    let editMode=req.query.edit;
    console.log(editMode)
    const prodId=req.params.productId
    if(!editMode)
        return res.redirect('/')
    Product.findAll({where:{id:prodId}})
            .then((products)=>{
                res.render('admin/add-product',{
                    pageTitle:'edit product',
                    path:'/admin/edit-product',
                    editing:Boolean(editMode),
                    product:products[0]
                })
            })
}
exports.postEditProduct=(req,res,next)=>{
    const prodId=req.body.productId;
    const title=req.body.title;
    const price=req.body.price;
    const imageUrl=req.body.imageUrl;
    const description=req.body.description;
    Product.findAll({where:{id:prodId}})
    .then((products)=>{
        Product.update({title,price,
          imageUrl,
          description
      },{where:{
          id:products[0].id
      }}).then(()=>{
        res.redirect('/products');
      }).catch((err)=>console.log(err))
    })
    .catch((err)=>{
        console.log(err);
    })
}
exports.postDeleteProduct=(req,res,next)=>{
    let prodId=req.body.prodId;
    Product.deleteById(prodId);
    res.redirect('/products')
}
exports.getProducts=(req,res,next)=>{
Product.findAll()
.then((products)=>{
    res.render('admin/products',{products,path:'/admin/products',pageTitle:'admin products'});
})
}