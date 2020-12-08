const express = require('express')
const router = express.Router()
const { createUser, findUserByEmail, findUserById } = require('../controllers/users')
const { verifyToken } = require('../middleware/verifyToken')
const { createToken } = require('../tokens/tokenService')

router.route('/')
  .post(async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    for (const data in req.body) {
      if (!req.body[data] || req.body[data] === ' ') {
        res.status(400).json({ message: `${data} must be provided` })
        return
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
        res.status(400).json({ message: `${data} must be provided` })
        return
      }
    }

    try {
      const user = await findUserByEmail(email)
      const isMatch = await user.comparePasswords(password)
      if (!isMatch) {
        res.status(400).json({ message: 'password and email do not match' })
        return
      }
      const token = createToken({ id: user._id })
      res.cookie('token', token)
      res.status(200).send({})

    } catch(err) {
      console.log(err)
      res.status(500).json({ message: 'internal server error' })
    }

  })

router.route('/logout')
  .get(async (req, res) => {
    console.log(req)
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