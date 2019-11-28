const constant = require('./constant')
const User = require('../models/User')

class Analysis {
    constructor() { }

    jsonToArray(json) {
        const arr = new Array()
        // drama, fantasy, horror, romance ...
        const p_genre = json.genre
        if(p_genre.drama == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.fantasy == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.horror == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.romance == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.action == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.thriller == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.animation == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.adventure == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.mistery == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.history == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.sf == true) { arr.push(1) } else { arr.push(0) }
        if(p_genre.comedy == true) { arr.push(1) } else { arr.push(0) }
        return arr
    }

    calcP(p1, p2) {
        let sumX = 0; let sumY = 0
        let sumX2 = 0; let sumY2 = 0
        let sumXY = 0; let N = 0
        const data1 = this.jsonToArray(p1.preference.genre)
        const data2 = this.jsonToArray(p2.preference.genre)

        for(var i = 0; i < data1.length; i++) {
            for(var j = 0; j < data2.length; j++) {
                sumX += data1[i]
                sumY += data2[j]
                sumX2 += data1[i]*data1[i]
                sumY2 += data2[j]*data2[j]
                sumXY += data1[i]*data2[j]
                N += 1
            }
        }

        const denom = sumXY - (sumX * (sumY / N))
        const numer = (sumX2 - sumX * (sumX / N)) * (sumY2 - sumY * (sumY / N))

        return denom / Math.sqrt(numer)
    }

    async getMovieFavorite(data) {
        try {
            const g = await new Array()
            const result = await new Array()
            // get user data for user's favorite genre
            const user = await User.getUserByEmail(data.email)
            const userGenre = await user.preference.genre

            //specify favorite genre in all genre
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

            // send result data
            return result.map(data => JSON.parse(data))
            }
        catch(err) { return err }
    }
}