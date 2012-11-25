var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {

  if (req.url=='/window.html'){
	  fs.readFile(__dirname + '/window.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
  }
  else if (req.url=='/clock.png'){
	  fs.readFile(__dirname + '/clock.png',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
  }

  else{
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
  }
}

io.sockets.on('connection', function (socket) {
  socket.on('remote', function (data) {
	  io.sockets.emit('msg', data);
	  console.log(data);
  });
});
