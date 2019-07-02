const express = require("express");
const router = express.Router();

//import models
const User = require("../models/userModel");
const Task = require("../models/taskModel");

//import validator
const {
  idSchema,
  validateParam,
  userSchema,
  taskSchema,
  validateBody
} = require("../helpers/routeHelpers");

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

//note this assumes the user id supplied to the body. In reality, we can get the user id from token
router.post("/", async (req, res, next) => {
  try {
    const user = await User.findById(req.body.owner);
    const Newtask = new Task(req.body);
    const task = await Newtask.save();
    //note user should know a task is added 
    user.tasks.push(Newtask)
    await user.save()
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
