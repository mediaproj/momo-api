const router = require('express').Router()
const Movie = require('../models/Movie')
const User = require('../models/User')
const kofic = require('../utils/kofic')
const constant = require('../utils/constant')

router.get('/favorite', async (req, res) => {
    try {
        // favorite movie
        const g = await new Array()
        const result = await new Array()
        sess_data = await req.session.user

        if(sess_data != {}) { // login status
            // get user data fo user's favorite genre
            const user = await User.getUserByEmail(sess_data.email)
            const userGenre = await user.preference.genre
            
            // specify favorite genre in all genres
            for(var i = 0; i < 12; i++) {
                const data = await constant.genresArray[i]
                if(userGenre[data]) {
                    await g.push(data)
                }
            }

            // search Movies 
            for(var i = 0; i < g.length; i++) {
                const movies = await Movie.getMovieInGenre(g[i])
                for(const movie of movies) {
                    const stringified = await JSON.stringify(movie)
                    if(!result.includes(stringified)) {
                        await result.push(stringified)
                    }
                }
            }
            await res.send(result.map(data => JSON.parse(data)))
        }
        else {
            res.send("not authorized")
        }
    }
    catch(err) { await res.status(500).send(err) }
})

router.get('/people', async (req, res) => {
    try {
        
    } catch(err) { res.status(500).send(err) }
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