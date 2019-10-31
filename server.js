const constant = require('./utils/constant')
const http = require('http')
const expressSession = require('express-session')
const mongoStore = require('connect-mongo')(expressSession)

//session
const session = expressSession({
    name: 'WhatShallWeDo',
    secret: 'YouCantSeeMe',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ url: constant.DB_STORE }),
})

// get express app
const app = require('./app')(session)

// create http server
const server = http.createServer(app)
const port = constant.SERVER_PORT || 5000

// bind socketio
const socketWrapper = require('./socketIO')
socketWrapper(server, session)

server.listen(port, '0.0.0.0', () => {
    console.log(`server start on port ${port}`)
})