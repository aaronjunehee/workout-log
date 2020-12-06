const mongoose = require('mongoose');
const exerciseSchema = require('./exerciseSchema')

const { Schema } = mongoose

const LogSchema = new Schema({
  date: { 
    type: String,
    required: true,
  },
  exercises: [exerciseSchema]
})

module.exports = mongoose.model('Log', LogSchema)