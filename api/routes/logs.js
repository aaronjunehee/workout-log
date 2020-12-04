const express = require('express');
const router = express.Router();
const { getLogs, createLog } = require('../controllers/logs')

router.route('/')
  .get(async (req, res) => {
    const logs = await getLogs()
    res.json(logs)
  })

  .post(async (req, res) => {
    const newLog = req.body;
    const log = await createLog(newLog)
    res.json(log)
  })

module.exports = router;