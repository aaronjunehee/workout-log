const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new mongoose.Schema({
  name: String,
  sets: String,
  reps: String,
})

const LogSchema = new mongoose.Schema({
  date: String,
  exercises: [ExerciseSchema]
})

module.exports = mongoose.model('Log', LogSchema);