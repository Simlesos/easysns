const cookies = require('../utils/cookies')
const send = require('../utils/send')
const models = require('../models')

function getLoginUserId (req, callback) {
  let c = cookies.parse(req.headers.cookie || '')
  if (!c.token) {
    return callback()
  }
  models.token.get(c.token, callback)
}


module.exports = function (req, res) {
  getLoginUserId(req, function (err, userId) {
    if (err) {
      return send.sendError(err, res)
    }
    models.user.get(userId, function (err, user) {
      if (err) {
        return send.sendError(err, res)
      }
      res.end(JSON.stringify(user, null, '\t'))
    })
  })
}