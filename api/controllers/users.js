const User = require('../models/User')

exports.createUser = async ({ email, password, firstName, lastName }) => {
  try {
    const newUser = new User({
      email,
      firstName,
      lastName,
      password,
    })
    const user = await newUser.save()
    return user
  } catch (err) {
    throw err
  }
}

exports.findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email })
    return user
  } catch (error) {
    throw error
  }
}

exports.findUserById = async (id) => {
  try {
    const user = await User.findById(id)
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  } catch (error) {
    throw error
  }
}