//use env variables
const mongoose = require('mongoose');
require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT; 
const DATABASE = process.env.DATABASE
const connectionstring = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${DATABASE}`

var connection = mongoose.connect(connectionstring.toString(),{useNewUrlParser: true}, function(error){
    if ( error){
       throw error
    }
})



 module.exports = connection 