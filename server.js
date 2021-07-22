const express = require('express')

const mongoose = require('mongoose')

// create express app
const app = express()

const dbConfig = require('./config/database.config.js')

const noteRoutes = require('./routes/notes.js')

mongoose.Promise = global.Promise

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: true,
}).then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

app.use('/notes', noteRoutes)

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."})
})

app.get('*', (req, res) => {
    res.json(
        {"message": "Sorry!.. this is invalid URL"}
    )
})

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})