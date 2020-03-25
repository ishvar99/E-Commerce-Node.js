const express=require('express');
var app=express();
const path=require('path');
const bodyParser=require('body-parser');
var adminRoutes=require('../routes/admin');
var shopRoutes=require('../routes/shop');
const pageNotFoundController=require('../controllers/404');
const sequelize=require('../utils/db.js');
const Product=require('../models/product')
const User=require('../models/user')
const Cart=require('../models/cart')
const CartItem=require('../models/cart-item')
const LOCAL_PORT=3000;
app.set('view engine','ejs');

app.set('views', path.join(__dirname,'..','views'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'..','public')))
app.use((req,res,next)=>{
    User.findByPk(1)
    .then((user)=>{
        req.user=user;
        next();
    })
   
})
app.use('/admin',adminRoutes);

app.use(shopRoutes);
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
app.use(pageNotFoundController.pageNotFound)
sequelize.sync() //{force:true}
.then(()=>{
    return User.findByPk(1)
    .then((user)=>{
        if(!user){
            return User.create({name:"Ishan",email:"test@gmail.com"})
        }
        return user;
    })
    .then((user)=>{
        return user.createCart();
    }).then(()=>{
        app.listen(LOCAL_PORT,()=>{
            console.log(`Server started on port ${LOCAL_PORT}`);
        });
    })
    .catch((err)=>console.log(err));
    
})
.catch((err)=>console.log(err));
