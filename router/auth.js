const router = require('express').Router()
const User = require('../models/User')

module.exports = router

router.post('/login', (req, res) => {
    const data = {
        email : req.body.email,
        password : req.body.password
    }
    
    //DB search
    User.getUserByEmail(data)
    .then((u) => {
        console.log(u)
        
        // check login validation
        if(req.body.email == u.email && req.body.password == u.password) {
            const user = {
                logined : true,
                email : email,
                nickname : nickname
            }
            req.session.user = user
            console.log("login status : ", req.session)
        }
        else {
            console.log("login failed")
        }
        res.send(re.session.user)
    })
    .catch((err) => { res.status(400).send(err) })

})

router.get('/signout', (req, res) => {
    req.session.destroy(err => {
        if(err) res.status(500).send(err)
        else res.sendStatus(200)
    })
})