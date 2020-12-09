const mongoose = require('mongoose');
const exerciseSchema = require('./exerciseSchema')

const { Schema } = mongoose

const LogSchema = new Schema({
  date: { 
    type: String,
    required: true,
  },
  exercises: [exerciseSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
})

module.exports = mongoose.model('Log', LogSchema)