import express from "express"
import User from "../model/User.js";
const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    // Destructure name and age from request body
    const { name, age } = req.body;

    // Create new user instance
    const newUser = new User({
      name,
      age,
    });

    // Save user in database
    const savedUser = await newUser.save();

    // Send success response
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle error
    res.status(500).json({ message: error.message });
  }
});


router.get("/users", async (req, res) => {
  try {
    // Fetch all users from database
    const users = await User.find();

    // Send users list
    res.status(200).json(users);
  } catch (error) {
    // Handle error
    res.status(500).json({ message: error.message });
  }
});

export default router;