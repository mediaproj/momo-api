const mongoose = require('mongoose')

// User table schema
const UserSchema = new mongoose.Schema({
    'email' : { type : String, unique : true, required : true },
    'profileImg' : String,
    'password' : { type : String, required : true },
    'age' : Number,
    'gender' : Boolean,
    'name' : { type : String, required : true },
    'preference' : {
        'genre' : {
            'drama' : Boolean,
            'fantasy' : Boolean,
            'horror' : Boolean,
            'romance' : Boolean,
            'action' : Boolean,
            'thriller' : Boolean,
            'animation' : Boolean,
            'adventure' : Boolean,
            'mistery' : Boolean,
            'history' : Boolean,
            'sf' : Boolean,
            'comedy' : Boolean
        },
        'section' : {
            'movie' : Boolean,
            'musical' : Boolean,
            'show' : Boolean,
            'festival' : Boolean
        }
    },
    'schedule' : [{
        'id' : String,
        'place' : String,
        'date' : Date,
        'title' : String,
        'txt' : String, 
        'enable' : Boolean
    }]
},
{
    collection : 'user',
    timestamps : true
})

// 사용자 생성 function
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

// All user find query
UserSchema.statics.getAllUsers = function() {
    return this.find({ })
}

UserSchema.statics.getUserByData = function(data) {
    return this.findOne({
        email : data.email,
        password : data.password
    })
}

// user find for login status
UserSchema.statics.getUserByEmail = function(email) {
    return this.findOne({email : email})
}

UserSchema.statics.getSimilarPeople = function() {
    return this.find()
    .where('preference.section.movie').equals(true)
}

UserSchema.statics.insertUserSchedule = function(email, schedule) {
    console.log(email)
    return this.updateOne({
        'email' : email
    },
    {
        $push : {
            'schedule' : schedule
        }
    })
}

UserSchema.statics.getMyChatRoom = function(email) {
    return this.findOne({
        'email' : email,
        'schedule.enable' : true
    })
}

module.exports = mongoose.model('user', UserSchema)