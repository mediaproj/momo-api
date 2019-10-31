const router = require('express').Router()
const User = require('../models/User')

module.exports = router

router.get('/login/:username/:password', (req, res) => {
    const data = {
        email : req.params.username,
        password : req.params.password
    }

    //mongo search
    User.getUserByData(data)
    .then((user) => { console.log("user : " + user);res.send(user) })
    .catch((err) => { res.status(400).send(err) })

})