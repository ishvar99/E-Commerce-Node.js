const express=require('express');
var app=express();
const path=require('path');
const rootDir=require('../utils/path');
const bodyParser=require('body-parser');
var adminData=require('../routes/admin');
var shopRoutes=require('../routes/shop');
const LOCAL_PORT=3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'..','public')))
app.use('/admin',adminData.routes);
app.use(shopRoutes);
app.set('view engine','pug');
app.set('views', path.join(__dirname,'..','views'));

app.use('/',(req,res,next)=>{
    // res.status(404).sendFile(path.join(rootDir,"..","views","404.html")) //__dirname gives current directory
    res.render("404")
})

app.listen(LOCAL_PORT,()=>{
    console.log(`Server started on port ${LOCAL_PORT}`);
});