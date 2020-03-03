const express=require('express');
var router=express.Router();
const path=require('path')
const rootDir=require('../utils/path');

router.get("/",(req,res,next)=>{
    res.sendFile(path.join(rootDir,'..','views','shop.html'));
})

module.exports=router;