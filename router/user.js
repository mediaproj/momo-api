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

router.get('/invite', async (req, res) => {
    const userSession = req.session.user
    if(userSession == undefined) {
        res.send("Unauthorized")
    }
    else {
        try {
            // 사용자가 초대한 사람들의 리스트가 들어왔으니
            // 각 사람들에게 초대에 대한 알림이 들어가야 함
            

        }
        catch(err) { res.status(500).send(err) }
    }
})

module.exports = router