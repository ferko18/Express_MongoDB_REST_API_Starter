const express = require("express");
const router = express.Router();

const Joi = require("@hapi/joi");

//import model
const User = require("../models/userModel");
const Task = require("../models/taskModel");

//import validator
const { useridSchema, validateParam } = require("../helpers/routeHelpers");

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

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const useridvalid = Joi.validate({ userid: userId }, useridSchema);
     console.log(useridvalid.value);
    if (useridvalid.error) {
      res.status(400).json({ message: "user id not valid" });
    } else {
      const user = await User.findById(useridvalid.value.userid);
      if (user !== null) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: "the specified id does not exist" });
      }
    }
  } catch (err) {
    next(err);
  }
});

//edit user

router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newUser = req.body;
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

//get tasks per user
router.get("/:userId/tasks",  validateParam(useridSchema, 'userId'), async (req, res, next) => {
  try {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate("tasks");
    res.status(200).json(user.tasks);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
