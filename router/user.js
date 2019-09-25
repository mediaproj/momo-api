const router = require('express').Router()

// get all user
router.get('/all', (_,res) => {
    res.send()
})

router.get('/login', (req, res) => {
    const username = req.params.username
    const password = req.params.password

    //mongo search


})

router.get('/signup', (req, res) => {
    
})

module.exports = router