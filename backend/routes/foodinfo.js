const express = require("express");
const router = express.Router();
const Info = require("../models/foodinfo.model");
const User = require("../models/user.model");

//Get all food records saved in a user with id
router.get("/api/food/:userId", async (req, res) => {
  try {
    const foods = await Info.find({ userId: req.params.userId });
    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Create a food info obj & update details in user
router.post("/api/food/:userId", async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    //const { userId, info_name , diet_type, cuisine_name } = req.body;
    const userD = await User.findOne({ _id: req.params.userId });
    if (userD) {
      console.log("userD",userD);
    }
    const savedInfo = await new Info({ 
      userid : req.params.userId,
      info_name : req.body.info_name,
      diet_type : req.body.diet_type,
      cuisine_name : req.body.cuisine_name
     }).save();
    console.log(savedInfo)
    userD.food_info.push(savedInfo._id);
    await userD.save();
    res.status(201).send({ message: "Successfully added food information" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Get all the food info records
router.get("/api/foods", async (req, res) => {
  try {
    const foods = await Info.find({});
    if (foods) {
      res.status(200).json(foods);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Update a food info record & from user id
router.put("/api/food/:userId/:foodId", async (req, res) => {
  try {
    const { info_name, diet_type, cuisine_name } = req.body;
    console.log(req.params.userId)
    const userD = await User.findOne({ _id : req.params.userId });
    if (!userD) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("userD", userD)
    // Find the foodinfo by its ID
    const foodinfo = await Info.findOne({ _id : req.params.foodId });
    if (!foodinfo) {
      return res.status(404).json({ message: "Food info not found" });
    }

    // Update the foodinfo details
    foodinfo.info_name = info_name;
    foodinfo.diet_type = diet_type;
    foodinfo.cuisine_name = cuisine_name;
    await foodinfo.save();

    // Update the user details
    userD.food_info.push(foodinfo._id);
    await userD.save();
    res.status(200).json({ message: "Food info updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Delete a food info record & from user id
router.delete("/api/food/:userId/:foodId", async (req, res) => {
  try {
    const userD = await User.findById(req.params.userId);
    if (!userD) {
      return res.status(404).json({ message: "User not found" });
    }

    const foodinfo = await Info.findById(req.params.foodId);
    if (!foodinfo) {
      return res.status(404).json({ message: "Food info not found" });
    }

    const index = userD.food_info.indexOf(req.params.foodId);
    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Food info not found in user array" });
    }
    userD.food_info.splice(index, 1);
    await userD.save();

    await Info.findByIdAndDelete(req.params.foodId);

    res.status(200).json({ message: "Food info deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
