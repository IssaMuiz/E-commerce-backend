const User = require("../models/users");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status.json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "New user added successfully!",
      data: newUser,
    });
  } catch (error) {
    console.error("something went wrong", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { register };
