const mongoose = require("mongoose");

export const userSchema = new mongoose.Schema(
  {
    lastName: String,
    firstName: String,
    email: String,
    lastLogin: Date,
    registerDate: Date,
    role: String
  },
  {
    collection: "users"
  }
);
