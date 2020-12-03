const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: String,
  sets: String,
  reps: String,
})

module.exports = mongoose.model('Exercise', ExerciseSchema);