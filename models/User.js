const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    'email' : String,
    'password' : String,
    'nickname' : String,
    'age' : Number,
    'gender' : Boolean,
    'name' : String,
    'preference' : {
        'genre' : {
            'drama' : Boolean,
            'fantasy' : Boolean,
            'horror' : Boolean,
            'romance' : Boolean,
            'action' : Boolean,
            'thriller' : Boolean,
            'blues' : Boolean,
            'mistery' : Boolean,
            'comedy' : Boolean,
            'documentary' : Boolean,
            'family' : Boolean,
            'sf' : Boolean,
            'animation' : Boolean
        },
        'section' : {
            'movie' : Boolean,
            'musical' : Boolean,
            'show' : Boolean,
            'festival' : Boolean
        }
    }
},
{
    collection : 'user',
    timestamps : true
})

UserSchema.statics.findOneorCreate = function(data) {
    const self = this
    return new Promise((resolve, reject) => {
        return self.findOne({
            email : data.email,
            password : data.password
        })
        .then((result) => {
            if(result == null) {
                return self.create(data)
                    .then((result) => {
                        return resolve(result)
                    })
                    .catch((err) => { return reject(err) })
            }
            else { return resolve(result) }
        })
        .catch((err) => {
            return reject(err)
        })
    })
}

UserSchema.statics.getAllUsers = function() {
    return this.find({ })
}

UserSchema.statics.getUserByData = function(data) {
    return this.findOne({
        email : data.email,
        password : data.password
    })
}

module.exports = mongoose.model('user', UserSchema)