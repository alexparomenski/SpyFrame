const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server);

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
});

//routes
app.get('/navigator', function(req,res) {
    res.sendFile(__dirname + '/public/navigator.html');
});

app.get('/Spy', function(req,res) {
    res.sendFile(__dirname + '/public/spy.html');
});

socketIO.on('connection', function(socket){
    console.log(socket.id + ' - a user connected');
  
    socket.on("playerPosX", function (data){
        //console.log("Recieving Position");
        //console.log(data);
        socketIO.sockets.emit('sendXPos', data);
    });

    socket.on("playerPosZ", function (data){
        //console.log("Recieving Position");
        socketIO.sockets.emit('sendZPos', data);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);