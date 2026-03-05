import express from "express"
import dotenv from "dotenv"
// import { connectDB } from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js"
dotenv.config();
const PORT = process.env.PORT;
import serverless from "serverless-http";
import mongoose from "mongoose";

// Create express app
const app = express();
app.use(express.json());
app.use("/api", userRoutes);

// MongoDB connection caching (IMPORTANT for Lambda)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const db = await mongoose.connect(process.env.MONGO_URI);
  isConnected = db.connections[0].readyState;
  console.log("MongoDB Connected");
};

app.get("/", (req, res) => {
    res.json({
        "message": "hello guys"
    })
});

// Export Lambda handler
export const handler = async (event, context) => {
  // Prevent Lambda from waiting for open DB connection
  context.callbackWaitsForEmptyEventLoop = false;

  // Connect DB
  await connectDB();

  // Wrap express app
  return serverless(app)(event, context);
};