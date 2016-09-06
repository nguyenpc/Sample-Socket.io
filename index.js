var app = require('express')();
var express = require('express');

var http = require('http').Server(app);

app.use(express.static('static'));

var server = http.listen(3000, function () {
    console.log('listening on *:3000');
});

var io = require('socket.io')(server);
// Set Express routes.

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/client', (req, res) => {
    res.sendFile(__dirname + '/mobile.html');
});

// Set socket.io listeners.
io.of('/admin').on('connection', (socket) => {
    console.log(socket.id);
    console.log('an admin user connected');

    socket.on('disconnect', () => {
        console.log('an admin user disconnected');
    });
});

io.of('/mobile').on('connection', (socket) => {
    console.log(socket.id);
    console.log('a mobile user connected');

    socket.on('disconnect', () => {
        console.log('a mobile user disconnected');
    });
});

app.get('/admin', (req, res) => {
    io.of('/admin').emit('message', 'Hello Admin!');
    res.send("Message Received");
});

app.get('/mobile', (req, res) => {
    io.of('/mobile').emit('message', 'Hello Mobile!');
    res.send("Message Received");
});