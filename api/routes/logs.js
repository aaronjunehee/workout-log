const express = require('express');
const router = express.Router();
const { getLogs, createLog, findLog, updateLog } = require('../controllers/logs')

router.route('/')
  .get(async (req, res) => {
    const logs = await getLogs()
    res.json(logs)
  })

  .post(async (req, res) => {
    let log
    const newLog = req.body;
    const existingLog = await findLog(newLog)
  
    if (existingLog) {
      log = await updateLog(existingLog, newLog)
    } else {
      log = await createLog(newLog)
    }
    res.json(log)
  })

module.exports = router