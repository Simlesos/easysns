const cookies = require('../utils/cookies')
const send = require('../utils/send')
const models = rquire('../models')

function getLoginUserId (req, callback) {
  let c = cookies.parse(req.headers.cookie || '')
  if (!c.token) {
    return callback()
  }
  models.token.get(c.token, callback)
}

models.exports = function authorize(controller) {
  return function (req, res) {
    getLoginUserId(req, function (err, userId) {
      if (err) {
        send.sendError(err, res)
      }
      req.userId = userId
      controller(req, res)
    })
  }
}