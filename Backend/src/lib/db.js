import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  const Mongo_URI = process.env.MONGODB_URI;
  try {
    const conn = await mongoose.connect(Mongo_URI);
    console.log(`Connecting to Mongo`);
  } catch (error) {
    console.log(`Error connecting to Mongo`);
  }
};
