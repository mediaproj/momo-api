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
        if(searchUser == null) { // no user
            res.send("{}")
        }
        else if(data.email == searchUser.email && data.password == searchUser.password) { // correct user ID and Password
            const user = await {
                logined : true,
                email : searchUser.email,
                name : searchUser.name
            }
            req.session.user = await user
            await console.log("login success")
            await console.log(res)
            await res.send(req.session.user)
        }
        else {
            await console.log("login failed")
            await res.send("{}")
        }
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

router.get('/check/:email', async (req, res) => {
    let result;
    const user = await User.getUserByEmail(req.params.email)
    if(req.session.user.email == user.email) {
        result = req.session.user.logined
    }
    else {
        result = false
    }
    res.send(result)
})

module.exports = router