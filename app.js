const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const mongoose = require('mongoose')
const constant = require('./utils/constant')

module.exports = session => {

    const app = express()
    app.use(session)

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // Mongo Connection
    const url = `mongodb://${constant.DB_HOST}:${constant.DB_PORT}/${constant.DB_NAME}`
    mongoose.Promise = global.Promise
    mongoose.connect(url, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => { console.log("MongoDB is Connected") })
    .catch((err) => { console.error(err) })

    // security
    app.use(helmet.hidePoweredBy({ setTo : 'HelloMyWorld' }))

    //route
    app.use('/user', require('./router/user'))
    app.use('/auth', require('./router/auth'))
    app.use('/movie', require('./router/movie'))

    return app
}