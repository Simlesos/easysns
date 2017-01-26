const http = require('http')
const parseUrl = require('url').parse

function homeController (req, res) {
  res.end('home\n')
}

function userController (req, res) {
  res.end('user\n')
}

function notFoundController (req, res) {
  res.writeHead(404)
  res.end('not found\n')
}

const rules = [
  { path: '/', controller: homeController },
  { path: '/user', controller: userController }
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
    return rule.path === pathName
  })

  let controller = rule && rule.controller || notFoundController

  controller(req, res)
})

server.listen(3000)