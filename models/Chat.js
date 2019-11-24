const mongoose = require('mongoose')
const constant = require('../utils/constant')

const ChatSchema = new mongoose.Schema({
    'people' : [String],
    'chats' : [{
        'user' : String,
        'chat' : String
    }]
},
{
    collection : 'chat',
    timestamps : true
})