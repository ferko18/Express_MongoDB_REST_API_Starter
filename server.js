//1. dependencies
const express = require("express"),
  helmet = require("helmet"),
  cors = require("cors"),
  logger = require("morgan"), mongoose= require('mongoose');
require("dotenv").config();
const connection = require('./database/connection')


//2. server to point to
const server = express();
server.use(logger("dev"));

mongoose.connection.once('open', function () {  
  console.log('\n connected to MongoDB...\n');
}); 

//3. use dependencies
server.use(helmet(), express.json(), cors());

//4. default end point
server.get("/", (req, res) => {
  res.send("welcome to express mongodb web api!");
});

//NOTE: routes should be executed before error handling
//7. Import routes 

const usersRouter = require('./routes/users');

//8.Use routes 

server.use('/users', usersRouter)

//5. catch 404 errors
server.use((res, req, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//6. handle 404 errors
server.use((err, req, res, next) => {
  const env = process.env.NODE_ENV;
  const error = env === "development" ? err : {message: 'can\'t process your request this time, try again latter'};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message
    }
  });
});




module.exports = server;
