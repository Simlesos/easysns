const mime = require('mime')
const joinPath = require('path').join
const fs = require('fs')
const publicPath = joinPath(__dirname, '../public')

exports.sendFile = function (path, res) {
  fs.readFile(path, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404)
        res.end('not found')
        return
      } else {
        res.writeHead(500)
        res.end('server err')
        return
      }
    }

    let mimeType = mime.lookup(path)
    let charset = mime.charsets.lookup(mimeType)
    let contentType = mimeType + charset ? `; charset=${charset}` : ''
    res.setHeader('Content-Type', contentType)
    res.end(data)
  })
}

exports.redirect = function (location, res, statusCode) {
  statusCode = statusCode || 302
  res.writeHead(statusCode, {
    location: location
  })
  res.end()
}

exports.sendError = function (err, res, statusCode) {
  statusCode = statusCode || 500
  res.writeHead(statusCode)
  res.end(err.message)
}
