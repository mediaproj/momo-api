const User = require('../models/User')

module.exports.insertSchedule = async (data) => {
    await User.insertUserSchedule(data)
    1
}