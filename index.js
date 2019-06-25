const server = require ('./server')
require ('dotenv').config();



const port = 4000 || process.env.PORT
server.listen (port, ()=>{
   console.log(`\n server running on port ${port}...\n `) 
})