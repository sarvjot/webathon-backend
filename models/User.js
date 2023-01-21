import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

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

export default User

