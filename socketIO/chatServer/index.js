const User = require('../../models/User')

const ChatServer = socketServer => {
    socketServer.on('connection', socket => {
        console.log(socket)
            socket.emit('init', {hello : "Somenone connected at meet"})
    })
    
}

module.exports = ChatServer