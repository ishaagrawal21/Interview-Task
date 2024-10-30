const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username)
      return res.status(400).send({ message: "username is required" });
    if (!email) return res.status(500).send({ message: "email is required" });
    if (!password)
      return res.status(400).send({ message: "password is required" });
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error, "err");
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const refresh_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.access_token = access_token;
    user.refresh_token = refresh_token;
    await user.save();

    res.status(200).json({ access_token, refresh_token });
  } catch (error) {
    console.error("Error logging in:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "User already exists" });
    }
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
