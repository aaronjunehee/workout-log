const express = require('express');
const router = express.Router();
const logs = require('../data');

router.get('/', (req, res) => {
  res.json(logs)
})

module.exports = router;