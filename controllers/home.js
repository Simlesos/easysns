const sendFile = require('../utils/send').sendFile
const joinPath = require('path').join


const viewPath = joinPath(__dirname, '../views')

module.exports = function (req, res) {
  let isLogin = false
  let view = isLogin ? 'home.html' : 'welcome.html'
  sendFile(joinPath(viewPath, view), res)
}
