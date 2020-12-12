const Log = require('../models/Log')

exports.getLogsByUser = async (userID, date) => {
  try {
    const logs = await Log
      .find({ user: userID, date: date })
      .populate({ path: 'user', select: 'firstName lastName' })
    return logs
  } catch (err) {
    throw err
  }
}

exports.createLog = async ({ date, exercises, user }) => {
  console.log('controller', user)
  try {
    const newLog = new Log({ date, exercises, user })
    const log = await newLog.save()
    return log
  } catch (err) {
    throw err
  }
}

exports.findLog = async ({ date, user }) => {
  try {
    const [existingLog] = await Log.find({ date, user })
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