// ? IN THIS FILE, WE ARE GOING TO CREATE CONNECTION WITH THE DATABASE 🔥

// * Importing mongoose (ODM Library)
import mongoose from "mongoose";

// * Importing dotenv to load environment variables
import dotenv from "dotenv";
dotenv.config(); // Ensures environment variables are loaded

mongoose.set("strictQuery", true);

// ! Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined. Check your .env file.");
    }

    console.log(`Attempting to connect to MongoDB at: ${process.env.MONGO_URI}`);

    // Establish connection with MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`.red.bold);
    console.error(`Stack Trace: ${error.stack}`.red);
    process.exit(1); // Exit process with failure
  }
};

// * Export the connectDB function
export default connectDB;
