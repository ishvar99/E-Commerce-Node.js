const path=require('path')
const fs=require('fs')
const mainDirectory=require('../utils/path');
const p=path.join(mainDirectory,'..','data','products.json');
module.exports= class Product{
    constructor(title){
        this.title=title;
    }
    save(){
        fs.readFile(p,(err,fileContent)=>{
            let products=[];
            if(!err){
                console.log(fileContent)
              products= JSON.parse(fileContent)
            }
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                
            })
        })
    }
    static fetchAll(){ //static method is applied on the class not on the instance
        if(!fs.existsSync(p)){
            return [];
        }
        const products=fs.readFileSync(p);
        return JSON.parse(products);
    }
}