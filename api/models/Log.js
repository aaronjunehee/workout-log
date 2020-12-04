const mongoose = require('mongoose');
const { Schema } = mongoose;
const exerciseSchema = require('./exercise')

const LogSchema = new Schema({
  date: String,
  exercises: [exerciseSchema]
})

module.exports = mongoose.model('Log', LogSchema);