const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})

userSchema.pre('save', async function (next) {
  const user = this
  try {
    if (user.isModified('password') || user.isNew) {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      user.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePasswords = function (password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

module.exports = mongoose.model("User", userSchema)