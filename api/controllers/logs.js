const Log = require('../models/Log')

exports.getLogs = async () => {
  try {
    const logs = await Log.find()
    return logs
  } catch (err) {
    throw err
  }
}

exports.createLog = async ({ date, exercises }) => {
  try {
    const newLog = new Log({ date, exercises })
    const log = await newLog.save()
    return log
  } catch (err) {
    throw err
  }
}

exports.findLog = async ({ date }) => {
  try {
    const [existingLog] = await Log.find({ date })
    return existingLog
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