const express = require('express')
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

// dotenv: It loads environment variables from a .env file.
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(() => {console.log('Connected!') })

app.use(express.json())
app.use(bodyParser.json())
app.use(passport.initialize())

app.use(locationController)
app.use(userController)

app.get('/', (req, res) => {
	res.status(200).send('Hello World!')
  })

app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})
