const express = require('express');
const router = express.Router();
const logs = require('../data');

router.get('/', (req, res) => {
  res.json(logs)
})

router.post('/', (req, res) => {
  const exercises = req.body;
  logs.push(exercises)
  console.log(logs)
})

module.exports = router;