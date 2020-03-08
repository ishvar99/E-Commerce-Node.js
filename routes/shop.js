const express=require('express');
var router=express.Router();
const path=require('path')
const adminData=require('../routes/admin')
const rootDir=require('../utils/path');

router.get("/",(req,res,next)=>{
    // res.sendFile(path.join(rootDir,'..','views','shop.html'));
    res.render('shop',{products:adminData.products});
})

module.exports=router;