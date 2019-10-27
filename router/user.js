const router = require('express').Router()
const User = require('../models/User')


router.get('/', (_, res) => {
    res.send("root route")
})

router.post('/create', (req, res) => {
    data = req.body
    console.log(data)
    User.findOneorCreate(data)
    .then(() => { res.send("create done") })
    .catch((err) => { res.status(500).send(err) })
})

// get all user
router.get('/all', (_,res) => {
    User.getAllUsers()
    .then((data) => { res.send(data) })
    .catch((err) => { res.status(500).send(err) })
})

router.get('/signin/:username/:password', (req, res) => {
    const data = {
        email : req.params.username,
        password : req.params.password
    }

    //mongo search
    User.getUserByData(data)
    .then((user) => { console.log("user : " + user);res.send(user) })
    .catch((err) => { res.status(400).send(err) })

})

router.get('/signup', (req, res) => {

})

module.exports = router