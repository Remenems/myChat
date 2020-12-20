const express = require('express');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

const app = express();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
      origin: '*',
    }
  });

const router = require('./router');

app.use(router);
app.use(cors());

io.on('connect', (socket) => {
    console.log('We have a new connection!!!');

    socket.on('join', ({ name, room }, callback) => {
        const { error , user } = addUser({id: socket.id, name, room});

        if(error) {
            return callback(error);
        }

        socket.emit('message', { user : 'admin', text: user.name+', welcome to '+user.room});
        socket.broadcast.to(user.room).emit('message', {user : 'admin', text: user.name +'has joined the game'});

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users : getUsersInRoom(user.room)})

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        if(!user.room)
        {
            console.log("problème de room")
        }
        io.to(user.room).emit('message', {user : user.name, text: message});
        io.to(user.room).emit('roomData', {room : user.room, users: getUsersInRoom(user.room)});
        callback()
    });

    socket.on('disconnect', () => {
        console.log('Disconnection of a user');
        const user = removeUser(socket.id);

        if(user)
        {
            io.to(user.room).emit('message', {user : 'admin', text: user.name + ' has left.'})
        }
    })
});



app.use(router);

server.listen(PORT, ()=> console.log('Server has started on port '+ PORT));
