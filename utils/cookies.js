exports.parse = function (cookie) {
  let result = {}
  cookie.split(';').map(kv => {
    let pair = kv.trim().split('=')
    result[pair[0]] = pair[1]
  })
  return result
}