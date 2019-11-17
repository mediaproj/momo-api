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
        'drama' : '드라마',
        'fantasy' : '판타지',
        'horror' : '공포(호러)',
        'romance': '멜로/로맨스',
        'action' : '액션',
        'thriller' : '스릴러',
        'animation': '애니메이션',
        'adventure' : '어드벤처',
        'mistery' : '미스터리',
        'history' : '사극',
        'sf' : 'SF',
        'comedy' : '코미디'
    },
    genresArray : [
        'drama',
        'fantasy',
        'horror',
        'romance',
        'action',
        'thriller',
        'animation',
        'adventure',
        'mistery',
        'history',
        'sf',
        'comedy']
})