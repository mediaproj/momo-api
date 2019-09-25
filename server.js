const constant = require('./utils/constant')
const http = require('http')
const app = require('./app')()

const server = http.createServer(app)
const port = constant.SERVER_PORT || 5000

server.listen(port, '0.0.0.0', () => {
    console.log(`server start on port ${port}`)
})