const queryString = require('querystring')
const parseBody = require('../utils/parseBody')
const send = require('../utils/send')
const models = require('../models')
const userModel = models.user

exports.login = function (req, res) {
  parseBody(req, (err, body) => {
    if (err) {
      send.sendError(err, res)
    }

    models.user.getByEmail(body.email, function (err, user) {
      if (err) {
        send.sendError(err, res)
      }
      if (!user) {
        return send.redirect('/?err=no_user', res)
      }
      if (body.password !== user.password) {
        return send.redirect('/?err=invalid_pass', res)
      }
      send.redirect('/', res)
    })
  })
}

exports.register = function (req, res) {
  parseBody(req, (err, body) => {
    if (err) {
      send.sendError(err, res)
    }
    var user = {
      email: body.email,
      password: body.password,
      nickname: body.nickname
    }
    // save user
    models.user.create(user, function (err) {
      if (err) {
        return send.sendError(err, res)
      }

      send.redirect('/', res)
    })
  })
}
