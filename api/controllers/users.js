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