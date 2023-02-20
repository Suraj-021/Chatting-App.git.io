const io = require('socket.io')(8000,{
    // for solving the error of cors origin policy
    cors:{
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});
const users = {};


io.on('connection', socket => {
    socket.on('new-user-joint', name => {
        // for updating the users
        users[socket.id] = name;
        // broadcast for user joint event
        socket.broadcast.emit('user-joint', name);
    });

    socket.on('send', message => {
        // broadcast for message sent
        socket.broadcast.emit('received', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    })
});
