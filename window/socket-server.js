var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , mime = require('mime')

app.listen(80);

function handler (req, res) {

  var jsonpatt = new RegExp ('json$');
  var imgpatt = new RegExp ('png$');
  var csspatt = new RegExp ('css$');
  var windowpatt = new RegExp ('^.*window.*html$');

  if (windowpatt.test(req.url)){
	fs.readFile(__dirname + req.url, function (err, data) {
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
  else if (jsonpatt.test(req.url)) {
	fs.readFile(__dirname + '/json' + req.url, function(err,data) { 
		if (err) { 
			res.writeHead(500); 
			return res.end('JSON error '+err); 
		}
		res.writeHead(200);
		res.end(data);
	});

  }
  else if (csspatt.test(req.url)) {
	fs.readFile(__dirname + req.url, function(err,data) { 
		if (err) { 
			res.writeHead(500); 
			return res.end('stylesheet error '+err); 
		}
		res.writeHead(200);
		res.end(data);
	});

  }
  else if (imgpatt.test(req.url)) {
	fs.readFile(__dirname + req.url, function(err,data) { 
		if (err) { 
			res.writeHead(500); 
			return res.end('stylesheet error '+err); 
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
