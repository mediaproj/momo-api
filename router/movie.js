const router = require('express').Router()
const Movie = require('../models/Movie')
const kofic = require('../utils/kofic')

router.get('/favorite/:email', (req, res) => {

})

router.get('/boxOffice', (_, res) => {
    kofic.getBoxOffice()
    .then((data) => { res.send(data) })
    .catch((err) => { res.status(500).send(err) })
})

router.get('/all', (_, res) => {
    Movie.getAllMovie()
    .then((data) => { res.send(data) })
    .catch((err) => { res.status(500).send(err) })
})

module.exports = router