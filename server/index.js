const express = require('express');
const http = require('http');

const app = express();

const PORT = process.env.PORT || 5000;

const router = require('./router');
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
      origin: '*',
    }
  });

io.on('connect', (socket) => {
    console.log('We have a new connection!!!');
    socket.on('disconnect', () => {
        console.log('Disconnection of a user');
    })
});



app.use(router);

server.listen(PORT, ()=> console.log('Server has started on port '+ PORT));
