const express=require('express');
var app=express();
const path=require('path')
const bodyParser=require('body-parser');
var adminRoutes=require('../routes/admin');
var shopRoutes=require('../routes/shop');
const LOCAL_PORT=3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use('/',(req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,"../","views","404.html"))
})

app.listen(LOCAL_PORT,()=>{
    console.log(`Server started on port ${LOCAL_PORT}`);
});