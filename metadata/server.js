var Server = require('bittorrent-tracker').Server
var server = new Server({
  udp: true, // enable udp server? [default=true]
  http: true, // enable http server? [default=true]
  ws: true, // enable websocket server? [default=true]
  stats: true, // enable web-based statistics? [default=true]
  filter: function (infoHash, params, cb) {
    var allowed = (infoHash === 'aaa67059ed6bd08362da625b3ae77f6f4a075aaa')
    if (allowed) {
      // If the callback is passed `null`, the torrent will be allowed.
      cb(null)
    } else {
      cb(new Error('disallowed torrent'))
    }
  }
})
server.http
server.udp
server.ws

server.on('error', function (err) {
  // fatal server error!
  console.log(err.message)
})

server.on('warning', function (err) {
  // client sent bad data. probably not a problem, just a buggy client.
  console.log(err.message)
})

server.on('listening', function () {
  // fired when all requested servers are listening
  console.log('listening on http port:' + server.http.address().port)
  console.log('listening on udp port:' + server.udp.address().port)
})

// start tracker server listening! Use 0 to listen on a random free port.
server.listen(5000, 'localhost', () => {
  console.log("escutando")
})

server.on('start', function (addr) {
  console.log('got start message from ' + addr)
})

server.on('complete', function (addr) {})
server.on('update', function (addr) {})
server.on('stop', function (addr) {})

// get info hashes for all torrents in the tracker server
// Object.keys(server.torrents)