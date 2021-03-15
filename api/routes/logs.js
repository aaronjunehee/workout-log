const express = require('express');
const { getLogByDate, createLog, findLog, updateLog, deleteExerciseByID } = require('../controllers/logs')
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

  .delete(async (req, res) => {
    const date = req.query.date
    const user = req.user.id
    const deleteID = req.query.deleteID

    const log = await findLog({ date, user })

    await deleteExerciseByID(log, deleteID)

    res.status(200).send({})
  })

module.exports = router