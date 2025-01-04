const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Mongodb connected successfully");
  } catch (error) {
    console.error("Error connecting mongoDB", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
