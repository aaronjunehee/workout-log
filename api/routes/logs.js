const express = require('express');
const { getLogByDate, createLog, updateLog, deleteExerciseByID } = require('../controllers/logs')
const { verifyToken } = require('../middleware/verifyToken')

const router = express.Router()

router.use(verifyToken)
router.route('/')

  .get(async (req, res) => {
    const { date } = req.query
    const log = await getLogByDate(req.user.id, date)
    res.json(log)
  })

  .post(async (req, res) => {
    const date = req.body.date
    const user = req.user.id

    const newLog = {
      date,
      exercises: req.body.exercises,
      user
    }

    let log
    const existingLog = await getLogByDate(user, date)

    if (existingLog) {
      log = await updateLog(existingLog, newLog)
    } else {
      log = await createLog(newLog)
    }
    res.json(log)
  })

  .delete(async (req, res) => {
    const date = req.query.date
    const user = req.user.id
    const deleteID = req.query.deleteID

    const log = await getLogByDate(user, date)

    await deleteExerciseByID(log, deleteID)

    res.status(200).send({})
  })

module.exports = router