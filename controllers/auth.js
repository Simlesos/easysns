const queryString = require('querystring')
const parseBody = require('../utils/parseBody')
const send = require('../utils/send')
const models = require('../models')
const crypto = require('crypto')

function generateToken(userId, callback) {
  let token = crypto.randomBytes(16).toString('hex')
  models.token.update(token, userId, function (err) {
    if (err) {
      return callback(err)
    }
    callback(null, token)
  })
}

function doLogin (userId, res) {
  generateToken(userId, function (err, token) {
    if (err) {
      return send.sendError(err, res)
    }
    res.writeHead(302, {
      'Set-Cookie': `token=${token}; path=/; HttpOnly`,
      location: '/'
    })
    res.end()
  })
}

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

      // 生成 Token 返回给用户
      doLogin(user.id, res)
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
      doLogin(user.id, res)
    })
  })
}
