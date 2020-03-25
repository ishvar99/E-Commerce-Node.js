const Sequelize=require('sequelize');
const sequelize=require('../utils/db')

module.exports=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:Sequelize.TEXT,
    name:Sequelize.STRING
})