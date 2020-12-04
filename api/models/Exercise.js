const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  name: String,
  sets: String,
  reps: String,
})

module.exports = exerciseSchema