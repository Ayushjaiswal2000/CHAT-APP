import express from "express";
import User from "../Models/user.model.js";
import Message from "../Models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    if (!loggedInUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    if (!filteredUsers) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ filteredUsers: filteredUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    if (!message) {
      return res.status(404).json({ message: "No messages found" });
    }
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const myId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId: myId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    //todo socketIo
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
