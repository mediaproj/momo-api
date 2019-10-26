const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    'email' : String,
    'password' : String,
    'age' : Number,
    'gender' : Boolean,
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
}
)

UserSchema.statics.upsertUser = (data) => {
    return this.findOneAndUpdate(
        {
            email : data.email
        },
        data,
        { upsert : true }
    )
}

UserSchema.statics.getAllUsers = () => {
    return this.find({})
}

UserSchema.statics.getUserByData = (data) => {
    return this.findOne({
        email : data.email,
        password : data.password
    })
}

module.exports = mongoose.model('user', UserSchema)