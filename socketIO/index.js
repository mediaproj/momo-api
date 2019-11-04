const socketIO = require('socket.io')
const meetServer = require('./meetServer')

const socketIOWrapper = (server, session) => {

    const io = socketIO(server)

    io.use((socket, next) => { session(socket.request, socket.request.res, next) })

    meetServer(io.of('/meet')) // use namespace '/meet' for mahjong server
    // chatServer(io.of('/chat')) // use namespace '/meet' for mahjong server
}
     
module.exports = socketIOWrapper
