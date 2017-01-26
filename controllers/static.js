const sendFile = require('../utils/sendFile').sendFile
const joinPath = require('path').join

const publicPath = joinPath(__dirname, '../public')

module.exports = function (req, res) {
  let path = req.params[1]
  path = joinPath(publicPath, path)
  sendFile(path, res)
}