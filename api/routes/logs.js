const express = require('express');
const { getLogsByUser, createLog, findLog, updateLog } = require('../controllers/logs')
const { verifyToken } = require('../middleware/verifyToken')

const router = express.Router()

router.use(verifyToken)
router.route('/')

  .get(async (req, res) => {
    const logs = await getLogsByUser(req.user.id)
    res.json(logs)
  })

  .post(async (req, res) => {
    const newLog = {
      date: req.body.date,
      exercises: req.body.exercises,
      user: req.user.id
    }

    let log
    const existingLog = await findLog(newLog)

    if (existingLog) {
      log = await updateLog(existingLog, newLog)
    } else {
      log = await createLog(newLog)
    }
    res.json(log)
  })

module.exports = router