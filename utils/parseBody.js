const getRawBody = require('./getRawBody')
const querystring = require('querystring')

module.exports = function (req, callback) {
  getRawBody(req, (err, rawBody) => {
    if (err) {
      return callback(err)
    }

    let type = req.headers['content-type'] || ''
    type = type.split(';')[0]
    if (type === 'application/x-www-form-urlencoded') {
      let body = querystring.parse(rawBody)
      callback(null, body)
    } else {
      callback()
    }
  })
}