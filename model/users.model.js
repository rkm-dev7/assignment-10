const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    address: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
