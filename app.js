const http = require('http')
const parseUrl = require('url').parse
const controllers = require('./controllers')

function notFoundController (req, res) {
  res.writeHead(404)
  res.end('not found\n')
}

const rules = [
  { path: '/', controller: controllers.home },
  { path: '/user', controller: controllers.user },
  { path: /^\/static(\/.*)/, controller: controllers.static }
]

function find (array, match) {
  for (let i = 0, item; item = array[i++];) {
    if (match(item)) return item
  }
}

const server = http.createServer((req, res) => {
  const urlInfo = parseUrl(req.url)
  const pathName = urlInfo.pathname

  let rule = find(rules, rule => {
    if (rule.path instanceof RegExp) {
      let matchResult = pathName.match(rule.path)
      if (matchResult) {
        req.params = matchResult
      }
      return matchResult
    }
    return rule.path === pathName
  })

  let controller = rule && rule.controller || notFoundController

  controller(req, res)
})

server.listen(3000)