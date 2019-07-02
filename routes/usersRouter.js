//note some route validation not complete, get back to it when time allows 

const express = require("express");
const router = express.Router();

const Joi = require("@hapi/joi");

//import model
const User = require("../models/userModel");
const Task = require("../models/taskModel");

//import validator
const { idSchema, validateParam, userSchema, validateBody } = require("../helpers/routeHelpers");

//get all users

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

//add new user --validation with middleware 

router.post("/", validateBody(userSchema),async (req, res, next) => {
  try {
    const newUser = new User(req.value.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

//get user by id--validation here is done using direct approach

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const useridvalid = Joi.validate({ param: userId }, idSchema);
    //  console.log(useridvalid.value.param);
    if (useridvalid.error) {
      // console.log(useridvalid.error)
      res.status(400).json({ message: "user id not valid" });
    } else {
      const user = await User.findById(useridvalid.value.param).populate("tasks");
      if (user !== null) {
        res.status(200).json({user: user});
      } else {
        res.status(400).json({ message: "the specified id does not exist" });
      }
    }
  } catch (err) {
    next(err);
  }
});

//edit user

router.put("/:userId", validateBody(userSchema), async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newUser = req.value.body;
    const updatededUser = await User.findByIdAndUpdate(userId, newUser); //this still holds old user
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

//delete user

router.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const tobedeleted = await User.deleteOne({ _id: userId });
    res.status(200).json(tobedeleted);
  } catch (err) {
    next(err);
  }
});

//add task per user

router.post("/:userId/tasks", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newTask = new Task(req.body);
    const user = await User.findById(userId);
    newTask.owner = user;
    await newTask.save();
    user.tasks.push(newTask);
    await user.save();
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

//get tasks per user--validation with a middleware
router.get("/:userId/tasks",  validateParam(idSchema, 'userId'), async (req, res, next) => {
  try {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate("tasks");
    if (user!==null)
    {
    res.status(200).json(user.tasks);}
    else{
      res.status(400).json({ message: "the specified id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
