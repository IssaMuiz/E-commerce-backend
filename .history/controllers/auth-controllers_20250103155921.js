const User = require("../models/auth");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "New user added successfully!",
      data: user,
    });
  } catch (error) {
    console.error("something went wrong", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
      });
    }
  } catch (error) {
    console.error("something went wrong", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }

  const { email, password } = req.body;
};

module.exports = { register, login };
