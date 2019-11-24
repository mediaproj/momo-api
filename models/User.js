const mongoose = require('mongoose')

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

UserSchema.statics.getUserByEmail = function(email) {
    return this.findOne({email : email})
}

UserSchema.statics.insertUserSchedule = function(schedule) {
    this.schedule.push(schedule)
    return this.save()
}

module.exports = mongoose.model('user', UserSchema)