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
app.use('/api/users', usersRouter)


const MONGO_CONFIG = { useNewUrlParser: true, useUnifiedTopology: true }

// server.js at the very end of the file.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'));
  // only add this part if you are using React Router
  app.get('*', (req, res) => {
    console.log(path.join(__dirname + '/build/index.html'));
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });
}

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
