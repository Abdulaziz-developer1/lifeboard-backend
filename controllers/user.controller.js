const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let config = require("../config/dotenv");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      config.SALT_LEVEL
    );
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    const userObj = newUser.toObject();
    delete userObj.password;
    res.json(userObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(
        updateData.password,
        config.SALT_LEVEL
      );
    }
    const updated = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Incorrect password" });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const userObj = user.toObject();
    delete userObj.password;
    res.json({ user: userObj, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
