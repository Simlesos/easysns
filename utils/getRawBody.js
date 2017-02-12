module.exports = function (stream, callback) {
  let buffers = []
  stream.on('data', data => {
    buffers.push(data)
  })

  stream.on('end', () => {
    callback(null, Buffer.concat(buffers).toString('utf8'))
  })

  stream.on('error', err => {
    callback(err)
  })
}