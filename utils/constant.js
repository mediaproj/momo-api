const fs = require('fs'), ini = require('ini')
const config = ini.parse(fs.readFileSync(require('path').join(__dirname, '../config.ini'), 'utf-8'))

module.exports = Object.freeze({
    // server port number
    SERVER_PORT : config.server.port,

    // mongoose data
    DB_HOST : config.database.host,
    DB_PORT : config.database.port,
    DB_NAME : config.database.db
})