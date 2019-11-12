const request = require('request-promise')
const constant = require('./constant')
const dateFormat = require('dateformat')
const Movie = require('../models/Movie')

module.exports.getBoxOffice = async () => {
    const opt = {
        method : 'GET',
        uri : constant.KOFIC_DAYBOXOFFICE_URL,
        json : true,
        qs : {
            key : constant.KOFIC_KEY,
            weekGb : "0",
            targetDt : dateFormat(Date.now()-86400000, 'yyyymmdd')
        }
    }
    return new Promise(async (resolve, reject) => {
        try {
            res = await request(opt)
            const movies = await res.boxOfficeResult.dailyBoxOfficeList
            movies.forEach(async (data) => {
                await module.exports.getMovieData(data.movieCd)
                .then(async (d) => {
                    // input movie data to mongoDB
                    // check DB by code
                    const find = await Movie.getMovieByCode(data.movieCd)
                    if(find == null) {
                        // if no movie data in mongoDB, upload new movie to DB
                        await Movie.uploadMovie(d)
                    }
                })
                .catch((err) => { reject(err) })
            })
            await resolve("done")
        } catch(e) { reject(e) }
    })
}

module.exports.getMovieData = async (code) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = (await request({
                uri : constant.KOFIC_MOVIEINFO_URL,
                method : 'GET',
                json : true,
                qs : {
                    key : constant.KOFIC_KEY,
                    movieCd : code
                }
            })).movieInfoResult.movieInfo

            // genre parsing
            var genres = []
            data.genres.forEach(async (gr) => {
                if(gr.genreNm in constant.genres)
                    genres.push(gr.genreNm)
            })

            // actors parsing
            var actors = []
            for(var i = 0; i < 3; i++) {
                const tmp = data.actors[i].peopleNm
                actors.push(tmp)
            }

            // date parsing
            const date = data.openDt
            const year = date.substring(0, 4)
            const month = date.substring(4, 6)
            const day = date.substring(6)
            const parseDate = year + "-" + month + "-" + day

            const result = {
                thumnail : "",
                title : data.movieNm,
                openDate : new Date(parseDate),
                movieCode : parseInt(code),
                genres : genres,
                director : data.directors[0].peopleNm,
                showTime : parseInt(data.showTm),
                actors : actors,
                nation : data.nations[0].nationNm
            }

            resolve(result)
        }
        catch(err) { reject(err) }
    })
}