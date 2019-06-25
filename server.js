//1. dependencies
const express = require("express"), helmet = require("helmet"), cors = require("cors"), logger = require("morgan");
require ('dotenv').config();

//2. server to point to 
const  server = express();
server.use(logger('dev'))

//3. use dependencies 
server.use(helmet(), express.json(), cors())

//4. default end point 
server.get ("/", (req, res)=>{
res.send("inddex page working!")
})

//5. catch 404 errors 
server.use((res, req, next)=>{
    const err = new Error ('Not Found');
    err.status = 404;
    next(err)
  })
  
//6. handle 404 errors 
  server.use((err, req, res, next)=>{
  const env = process.env.NODE_ENV
  const error = env==='development'? err : {};
  const status = err.status || 500;
  
  res.status(status).json({
      error: {
          message: error.message
      }
  })
  })

module.exports = server;