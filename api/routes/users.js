const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/users')

router.route('/')
  .post(async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    for (const data in req.body) {
      if (req.body[data] || req.body[data] === ' ') {
        res.status(400).json({ message: `${data} must be provided` })
        return
      }
    }

    try {
      const user = await createUser({ email, password, firstName, lastName })
      res.json({ data: { id: user._id} })
    } catch(err) {
      console.log(err)
      res.status(500).json({ message: 'internal server error'})
    }

  })

module.exports = router