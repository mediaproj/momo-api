const fs = require('fs'), ini = require('ini')
const config = ini.parse(fs.readFileSync(require('path').join(__dirname, '../config.ini'), 'utf-8'))

module.exports = Object.freeze({
    // server port number
    SERVER_PORT : config.server.port,

    // mongoose data
    DB_HOST : config.database.host,
    DB_PORT : config.database.port,
    DB_NAME : config.database.db,
    DB_STORE : config.database.storeUrl,

    // Naver movie API
    NAVER_API_ID : config.naver.id,
    NAVER_API_KEY : config.naver.key,
    NAVER_MOVIE_URL : config.naver.movieUrl,

    //kofic
    KOFIC_WEEKBOXOFFICE_URL : config.kofic.wBoxUrl,
    KOFIC_DAYBOXOFFICE_URL : config.kofic.dBoxUrl,
    KOFIC_MOVIEINFO_URL : config.kofic.searchInfo,
    KOFIC_KEY : config.kofic.key,

    //constant data
    genres : {
        '드라마' : 'drama',
        '판타지' : 'fantasy',
        '공포(호러)' : 'horror',
        '멜로/로맨스' : 'ramance',
        '액션' : 'action',
        '스릴러' : 'thriller',
        '애니메이션' : 'animation',
        '어드벤처' : 'adventure',
        '미스터리' : 'mistery',
        '사극' : 'history',
        'SF' : 'sf',
        '코미디' : 'comedy'
    }
})