const directoryName=require('../utils/path')
const path=require('path');
const fs=require('fs');
const p= path.join(directoryName,'..','data','carts.json');
module.exports=class Cart{
    static fetchAll(cb){
        
        const cart=fs.readFileSync(p);
        return JSON.parse(cart);
    }
    static addProduct(prodId,prodPrice)
    {
       
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
    static deleteProduct(prodId,prodPrice){
        let products=[];
        let totalPrice;
        let carts={};
        fs.readFile(p,(err,fileContent)=>{
            products=JSON.parse(fileContent)['products'];
            totalPrice=JSON.parse(fileContent)['totalPrice'];
            const existingProductIndex=products.findIndex((product)=>product.id===prodId);
            if(existingProductIndex!=undefined){
                console.log(existingProductIndex);
                totalPrice-=prodPrice;
                if(products[existingProductIndex].qty==1){
                    products=products.filter(product=>product.id!==prodId);
                }
                else{
                products[existingProductIndex].qty=products[existingProductIndex].qty-1;
                }
                carts['products']=products;
                carts['totalPrice']=totalPrice;
                fs.writeFile(p,JSON.stringify(carts),(err)=>{
            
                })
            }
        })
    }
}