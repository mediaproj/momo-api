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

module.exports = router