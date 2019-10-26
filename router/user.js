const router = require('express').Router()
const User = require('../models/User')


router.get('/', (_, res) => {
    res.send("root route")
})

router.post('/create', (req, res) => {
    data = req.body.data
    console.log(data)
    User.upsertUser(data)
    .then(() => { res.send("done") })
    .catch((err) => { res.status(500).send(err) })
})

// get all user
router.get('/all', (_,res) => {
    res.send()
})

router.get('/signin/:username/:password', (req, res) => {
    const data = {
        username : req.params.username,
        password : req.params.password
    }

    //mongo search
    User.getUserByData(data)
    .then((user) => { res.send(suer) })
    .catch((err) => { res.status(400).send(err) })

})

router.get('/signup', (req, res) => {

})

module.exports = router