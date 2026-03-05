// Import mongoose
import mongoose from "mongoose";

// Function to connect MongoDB
export const connectDB = async () => {
  try {
    // Connecting to MongoDB using connection string from .env
    await mongoose.connect(process.env.MONGO_URI);

    // If connection successful
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    // If connection fails
    console.error("MongoDB Connection Failed:", error.message);

    // Exit process with failure
    process.exit(1);
  }
};
