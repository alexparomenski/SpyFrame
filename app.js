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

    socket.on('red_event', function (data){
        console.log("Red event heard");
        socketIO.sockets.emit('color_change', {r:255,g:0,b:0});
    });

    socket.on('green_event', function (data){
        console.log("green event heard");
        socketIO.sockets.emit('color_change', {r:0,g:255,b:0});
    });

    socket.on('blue_event', function (data){
        console.log("Blue event heard");
        socketIO.sockets.emit('color_change', {r:0,g:0,b:255});
    });


    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);