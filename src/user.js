const mongoose = require("mongoose");
const userScheme = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  userName: String,
  inviteLink: String,
  userType: String,
  date: { type: Date, default: Date.now },
});
const adminScheme = new mongoose.Schema({
  id: String,
  date: { type: Date, default: Date.now },
});
module.exports.User = mongoose.model("User", userScheme);
module.exports.Admin = mongoose.model("Admin", adminScheme);
