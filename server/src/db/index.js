import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async (retries = 5, waitTime = 5000) => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
      {
        connectTimeoutMS: 10000, // Optional: Timeout for initial connection
        serverSelectionTimeoutMS: 5000, // Optional: Server selection timeout
        socketTimeoutMS: 45000, // Optional: Socket idle timeout
        maxPoolSize: 50, // Optional: Max connections in the pool
      }
    );
  } catch (error) {
    console.error("MongoDB connection FAILED: ", error.message);

    // Retry logic
    if (retries > 0) {
      console.log(`Retrying in ${waitTime / 1000} seconds...`);
      setTimeout(() => connectDB(retries - 1, waitTime), waitTime);
    } else {
      console.error("MongoDB connection failed after multiple retries");
      process.exit(1);
    }
  }
};

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to application termination");
  process.exit(0);
});

export default connectDB;
