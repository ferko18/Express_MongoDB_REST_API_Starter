const express = require("express");
const router = express.Router();

router.get('/', (req, res)=>{
res.status(200).json({message: 'users home page works'})
console.log('hi')
})

module.exports = router