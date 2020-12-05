const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  sets: { type: String, required: true },
  reps: { type: String, required: true }
})

module.exports = exerciseSchema