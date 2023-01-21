const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require("validator")

const { isStrongPassword } = validator

// User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is missing"],
  },
  password: {
    type: String,
    required: [true, "Password is missing"],
    validate: [isStrongPassword, "Password not strong enough"],
  },

})

UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", UserSchema)


module.exports.User = User
