var SSE = require('sse'),
    express = require('express'),
    app = express()

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendfile('public/index.html')
})

var server = app.listen(3000, '0.0.0.0', function() {
  var sse = new SSE(server),
      host = server.address().address,
      port = server.address().port

  sse.on('connection', function(client) {
    console.log('connection received')

    setTimeout(function() {
      client.send('hi there!')
      console.log('message sent')
    }, 3000)
  })

  console.log('SSE server created at http://%s:%s, listening...', host, port)
})
