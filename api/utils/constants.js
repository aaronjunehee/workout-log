'use strict'

exports.URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/workout-log'
exports.PORT = process.env.PORT || 4000
exports.SECRET = process.env.SECRET || 'super-secret-passphrase'
