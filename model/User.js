import mongoose from "mongoose";

// Create schema for User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  age: {
    type: Number,
    required: true, // Age is required
  },
});

// Create model from schema
const User = mongoose.model("User", userSchema);
export default User;