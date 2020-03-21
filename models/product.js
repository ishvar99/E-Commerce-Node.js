const path=require('path')
const fs=require('fs')
const mainDirectory=require('../utils/path');
const p=path.join(mainDirectory,'..','data','products.json');
const db=require('../utils/db');
module.exports= class Product{
    constructor(id,title,imageUrl,price,description){
        this.id=id;
        this.title=title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.description=description;
    }
    save(){
            return db.execute('INSERT INTO products(title,price,description,imageUrl) VALUES (?,?,?,?)',
            [this.title,this.price,this.description,this.imageUrl])
    }
  static  deleteById(id){
        let products=[];
        let updatedProducts=[];
        fs.readFile(p,(err,fileContent)=>{
            if(!err){
                products=JSON.parse(fileContent);
                updatedProducts=products.filter(prod=>prod.id!==id);
            }
            fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                console.log(err);
            })
        })
    }
    static fetchAll(){ //static method is applied on the class not on the instance
       return db.execute('SELECT * FROM products')
    }
    static findById(prodId){
        return db.execute('SELECT * FROM products where id=?',[prodId]);
    }
}