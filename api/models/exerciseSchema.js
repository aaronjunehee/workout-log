const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
})

module.exports = exerciseSchema