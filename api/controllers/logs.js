const Log = require('../models/Log')

exports.getLogs = async () => {
  try {
    const logs = await Log.find()
    return logs
  } catch (err) {
    throw err
  }
}

exports.createLog = async (data) => {
  try {
    const newLog = new Log(data)
    const log = await newLog.save()
    return log
  } catch (err) {
    throw err
  }
}

exports.findLog = async (data) => {
  try {
    const [existingLog] = await Log.find({ date: data.date })
    return existingLog
  } catch (err) {
    throw err
  }
}

exports.updateLog = async (db, newData) => {
  try {
    newData.exercises.map(exercise => {
      db.exercises.push(exercise)
    })
    const updatedLog = await db.save()
    return updatedLog
  } catch (err) {
    throw err
  }
}