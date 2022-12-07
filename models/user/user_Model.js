const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
      username: String,
      password: String,
      collections: Array
    })
  );

module.exports = User