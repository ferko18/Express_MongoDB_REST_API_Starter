const express = require("express");
const router = express.Router();

//import model
const User = require("../models/userModel");

//get all users

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

//add new user

router.post("/", async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

//get user by id 

router.get("/:userId", async (req, res, next)=>{
    try{
    const {userId}= req.params;
    const user = await User.findById(userId)
    console.log(userId)
    res.status(200).json(user)
} catch (err){
    next(err)
}
})

//edit user 

router.put("/:userId", async (req, res, next)=>{
  try{
    const {userId}= req.params;
    const newUser = req.body;
    const updatededUser = await User.findByIdAndUpdate(userId, newUser);
    res.status(201).json(newUser)
  }catch(err)
  {
    next(err)
  }
})

//delete user 

router.delete('/:userId', async(req, res, next)=>{
  try{
    const {userId} = req.params;
    const tobedeleted = await User.deleteOne({ "_id" : userId })
    res.status(200).json(tobedeleted)
  }
  catch(err)
  {
    next(err)
  }
})

module.exports = router;
