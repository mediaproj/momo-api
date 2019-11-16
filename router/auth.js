const router = require('express').Router()
const User = require('../models/User')

router.post('/login', async (req, res) => {
    const data = {
        email : req.body.email,
        password : req.body.password
    }
    console.log(data)
    try {
        // get user in DB
        const searchUser = await User.getUserByEmail(data.email)

        // check login validation
        if(data.email == searchUser.email && data.password == searchUser.password) {
            const user = await {
                logined : true,
                email : searchUser.email,
                name : searchUser.name
            }
            req.session.user = await user
            await console.log("login status : ", req.session)
        }
        else {
            await console.log("login failed")
        }

        // save session data in DB

        // send login result
        res.send(req.session.user)
    }
    catch(e) { await res.status(500).send(e) }
})

router.get('/signout', (req, res) => {
    console.log(req.session)
    if(req.session.user == undefined) {
        res.send("not authorized")
    }
    else {
        req.session.destroy(err => {
            if(err) res.status(500).send(err)
            else res.sendStatus(200)
        })
    }
    
})

module.exports = router