const express=require('express');
var app=express();
const path=require('path');
const bodyParser=require('body-parser');
var adminRoutes=require('../routes/admin');
var shopRoutes=require('../routes/shop');
const pageNotFoundController=require('../controllers/404');

const LOCAL_PORT=3000;
app.set('view engine','ejs');

app.set('views', path.join(__dirname,'..','views'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'..','public')))

app.use('/admin',adminRoutes);

app.use(shopRoutes);

app.use(pageNotFoundController.pageNotFound)

app.listen(LOCAL_PORT,()=>{
    console.log(`Server started on port ${LOCAL_PORT}`);
});