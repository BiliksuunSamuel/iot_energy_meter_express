import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  role: Number,
  status: Number,
});

export const AuthSchema = new mongoose.Schema({
  userId: String,
  password: String,
});
