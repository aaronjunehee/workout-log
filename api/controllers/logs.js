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