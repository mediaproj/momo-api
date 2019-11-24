const mongoose = require('mongoose')
const constant = require('../utils/constant')

const ChatSchema = new mongoose.Schema({
    'id' : String,
    'people' : [String],
    'title' : String
},
{
    collection : 'chat',
    timestamps : true
})