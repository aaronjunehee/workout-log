const Log = require('../models/Log')

exports.getLogByDate = async (userID, date) => {
  try {
    const log = await Log.findOne({ user: userID, date: date })
    return log
  } catch (err) {
    throw err
  }
}

exports.createLog = async ({ date, exercises, user }) => {
  try {
    const newLog = new Log({ date, exercises, user })
    const log = await newLog.save()
    return log
  } catch (err) {
    throw err
  }
}

exports.updateLog = async (db, { exercises }) => {
  try {
    exercises.map(exercise => {
      db.exercises.push(exercise)
    })
    const updatedLog = await db.save()
    return updatedLog
  } catch (err) {
    throw err
  }
}

exports.deleteExerciseByID = async (db, deleteID) => {
  try {
    db.exercises.splice(deleteID, 1)
    const updatedLog = await db.save()
    return updatedLog
  } catch (err) {
    throw err
  }
}