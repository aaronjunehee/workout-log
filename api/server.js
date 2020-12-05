const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const { URL, PORT } = require('./utils/constants')

const logsRouter = require('./routes/logs')
const usersRouter = require('./routes/users')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/logs', logsRouter)
// app.use('/api/users', usersRouter)


const MONGO_CONFIG = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
  .connect(URL, MONGO_CONFIG)
  .then(async () => {
    console.log(`Connected to database at ${URL}`)
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
