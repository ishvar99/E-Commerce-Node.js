const directoryName=require('../utils/path')
const path=require('path');
const fs=require('fs');
module.exports=class Cart{
    static addProduct(prodId,prodPrice)
    {
        const p= path.join(directoryName,'..','data','carts.json');
        fs.readFile(p,(err,fileContent)=>{
            let cart={products:[],totalPrice:0}
            if(!err){
                cart=JSON.parse(fileContent);
            }
            const existingProductIndex=cart.products.findIndex(prod=>prod.id===prodId);
            const existingProduct=cart.products[existingProductIndex];
            let updatedProduct,productPrice;
            if(existingProduct){
                updatedProduct={...existingProduct};
                updatedProduct.qty=updatedProduct.qty+1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
                productPrice+=updatedProduct.price*updatedProduct.qty;
            }else{
                updatedProduct={id:prodId,qty:1};
                cart.products=[...cart.products,updatedProduct];
            }
            cart.totalPrice=cart.totalPrice + +prodPrice;
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            })
        })
    }
}