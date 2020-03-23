const Sequelize=require('sequelize');

module.exports=new Sequelize('node-complete','root','tiger',{dialect:'mysql',
host:'localhost'});