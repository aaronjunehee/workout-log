const express = require('express')
const { createUser, findUserByEmail, findUserById } = require('../controllers/users')
const { verifyToken } = require('../middleware/verifyToken')
const { createToken } = require('../tokens/tokenService')

const router = express.Router()

const formatData = function(data) {
  const spaceAdded = data.replace(/([A-Z])/g, ' $1')
  const capitalized = spaceAdded.charAt(0).toUpperCase() + spaceAdded.toLowerCase().slice(1)
  return capitalized
}

const validateEmail = function(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

router.route('/')
  .post(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    for (const data in req.body) {
      if (!req.body[data] || req.body[data] === ' ') {
        const dataString = formatData(data)
        res.status(400).json({ message: `${dataString} must be provided` })
        return
      }
      if (req.body && req.body['email']) {
        const isValid = validateEmail(email)
        if (!isValid) {
          res.status(400).json({ message: 'Please enter a valid email address' })
          return
        }
      }
    }

    try {
      const user = await createUser({ email, password, firstName, lastName })
      res.json({ id: user._id})
    } catch(err) {
      console.log(err)
      res.status(500).json({ message: 'internal server error'})
    }
  })

router.route('/login')
  .post(async (req, res) => {
    const { email, password } = req.body

    for (const data in req.body) {
      if (!req.body[data] || req.body[data] === ' ') {
        const dataString = data.charAt(0).toUpperCase() + data.slice(1)
        res.status(400).json({ message: `${dataString} must be provided` })
        return
      }
      if (req.body && req.body['email']) {
        const isValid = validateEmail(email)
        if (!isValid) {
          res.status(400).json({ message: 'Please enter a valid email address' })
          return
        }
      }
    }

    try {
      const user = await findUserByEmail(email)
      if (!user) {
        res.status(401).json({ message: 'The email you\'ve entered doesn\'t match our records. Please double-check and try again.' });
        return
      }
      const isMatch = await user.comparePasswords(password)
      if (!isMatch) {
        res.status(401).json({ message: 'Sorry, your password was incorrect. Please double-check and try again.' });
        return
      }
      const token = createToken({ id: user._id })
      res.cookie('token', token)
      res.status(200).send({})

    } catch(err) {
      res.status(500).json({ message: 'internal server error' })
    }

  })

router.route('/logout')
  .get(async (req, res) => {
    res.clearCookie('token')
    res.status(200).send({})
  })

router.use(verifyToken).route('/me')
  .get(async (req, res) => {
    if (!req.user && !req.user.id) {
      res.status(400).json({ message: 'user not authenticated' })
      return
    }
    try {
      const user = await findUserById(req.user.id)
      res.json({ user })
    } catch(err) {
      console.log(err)
    }
  })
  
module.exports = router