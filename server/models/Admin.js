const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  admin: { type: String, default: "admin" },
  password: { type: String, required: true },
});

adminSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
