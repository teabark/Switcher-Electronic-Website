// routes/userRoutes.js
import express from "express";
import User from "../../models/user.model.js";
import connectMongo from "../../libs/mongodb.js";

const router = express.Router();

// Get all users
router.get("/getAll", async (req, res) => {
  try {

    await connectMongo();

    const users = await User.find({}, "-password"); // exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Create user
router.post("/create", async (req, res) => {
    try {

        await connectMongo();
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });
  
  // Update user
  router.put("/update/:id", async (req, res) => {
    try {
        await connectMongo();
      const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });
  
  // Delete user
  router.delete("/delete/:id", async (req, res) => {
    try {
        await connectMongo();
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  });
  

export default router;
