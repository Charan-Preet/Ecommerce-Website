const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: { type: String, required: [true, "Email is required"] },
  passwordHash: { type: String ,required: [true, "PasswordHash is required"]},
});

const User = mongoose.model("user", userSchema)

module.exports = User