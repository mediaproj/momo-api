const router = require('express').Router()
const User = require('../models/User')
const md5 = require('md5')

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

router.get('/invite/:email', async (req, res) => {
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

router.post('/schedule', async (req, res) => {
    try {
        const email = await req.body.email
        const scheduleData = await {
            'id' : req.body.id,
            'place' : req.body.place,
            'date' : new Date(req.body.date),
            'title' : req.body.title,
            'enable' : true
        }
        console.log(scheduleData)
        await User.insertUserSchedule(email, scheduleData)
        .then(async (data) => { console.log(data);await res.send("done") })
        .catch(async (err) => { await res.status(500).send(err) })
    }
    catch(err) { res.status(500).send(err) }
})

router.get('/schedule/:email', async (req, res) => {
    try {
        const sche = await new Array()
        const email = await req.params.email
        console.log(email)
        schedules = await User.getMyChatRoom(email)
        for(var s of schedules.schedule) {
            sche.push({
                'id' : s.id,
                'title' : s.title,
                'enable' : s.enable
            })
        }
        res.send(sche)
    }
    catch(err) { res.status(500).send(err) }
})

module.exports = router