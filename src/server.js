const express = require('express');
const {Server} = require('socket.io');

const app = express()

app.use(express.static(__dirname+'/public'));

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>{
    console.log(`Running on ${PORT}`)
})

let log = [];

const io = new Server(server);

io.on('connection',socket=>{
    console.log('socket conectado');
    socket.broadcast.emit('newUser');
    socket.on("message",data=>{
        log.push(data);
        io.emit("log",log)
    })
    socket.on("registered",data=>{
        console.log(data);
        socket.emit("log",log)
    })
})