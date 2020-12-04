const express = require('express');
const router = express.Router();
const Log = require('../../models/Log')

router.get('/', async (req, res) => {
  const logs = await Log.find()
  res.json(logs)
})

router.post('/', async (req, res) => {
  const logging = req.body;
  const log = new Log(logging);
  // exercises.forEach(exercise => {
  //   log.exercises.push(exercise)
  // })
  await log.save();
  res.sendStatus(200)
})

module.exports = router;