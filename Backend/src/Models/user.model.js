import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true, minimumLength: 6 },
    profilePic: { type: String, defaultValue: "" },
  },
  { timestamps: true }
);

export default User = new mongoose.model("users", userSchema);
