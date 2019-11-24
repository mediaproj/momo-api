const User = require('../../models/User')

const MeetServer = socketServer => {
    socketServer.on('connection', socket => {
        try {
            if(typeof socket.request.session.user == 'undefined') {
                socket.emit('unauthorized')
                socket.disconnect(true)
            }
            else {
                User.getUserByEmail(socket.request.session.user.email)
                .then((user) => {
                    if(user) {
                        console.log(`[registered player] ID:${user.email} nickname:${user.nickname}`)
                        // check if player is already in mahjang
                        const idx = mahjong.players.findIndex(p => p.id == info.id)
                        
                        if(idx != -1) {
    
                        }
                        else {
                            
                        }
                    }
                    else {
                        //Unregistered User
                        console.log("Unregistered")
                        socket.emit("Unregistered User", user)
                        socket.disconnect(true)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    socket.emit("db_error", err)
                    socket.disconnect(true)
                })
            }
        }
        catch(err) {  }
    })
    
}

module.exports = MeetServer