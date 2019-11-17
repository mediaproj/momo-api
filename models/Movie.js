const mongoose = require('mongoose')
const constant = require('../utils/constant')

const MovieSchema = new mongoose.Schema({
    'thumbnail' : String,
    'title' : String,
    'openDate' : Date, // movie
    'movieCode' : String,
    'genres' : [String],
    'director' : String,
    'showTime' : Number,
    'actors' : [String],
    'nation' : String
},
{
    collection : 'movie',
    timestamps : true
})

MovieSchema.statics.uploadMovie = function(data) {
    const self = this
    return self.create(data)
}

MovieSchema.statics.getAllMovie = function() {
    return this.find({ })
}

MovieSchema.statics.getMovieByCode = function(code) {
    return this.findOne({ movieCode : code })
}

MovieSchema.statics.getMovieInGenre = function(genre) {
    console.log(constant.genres[genre])
    return this.find({ "genres" : constant.genres[genre] })
}

module.exports = mongoose.model('movie', MovieSchema)