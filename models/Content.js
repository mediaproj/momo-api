const mongoose = require('mongoose')

const ContentSchema = new mongoose.Schema({
    'thumbnail  ' : String,
    'title' : String,
    'from' : Date,
    'to' : Date,
    'where' : String,
    'hashtag' : [String],
    'url' : String,
    'genre' : String
},
{
    collection : 'content',
    timestamps : true
})

ContentSchema.statics.uploadContent = function(data) {
    const self = this
    return new Promise((resolve, reject) => {
        return self.findOne({
            title : data.title,
            genre : data.genre
        })
        .then((result) => {
            if(result == null) {
                return self.create(data)
                    .then((result) => {
                        return resolve(result)
                    })
                    .catch((err) => { return reject(err) })
            }
            else { resolve(result) }
        })
        .catch((err) => {
            return reject(err)
        })
    })
}

ContentSchema.statics.getAllContent = function() {
    return this.find({ })
}

module.exports = mongoose.model('content', ContentSchema)