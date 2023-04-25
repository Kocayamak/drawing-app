const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

import { Server, Socket } from 'socket.io';

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

type Point = {x : Number , y: Number}

type DrawLine = {
    prevPoint : Point | null,
    currentPoint : Point,
    color : String
}

io.on('connection', (socket: Socket) => {
    socket.on('draw-line' , ({prevPoint, currentPoint, color} : DrawLine) => {
        socket.broadcast.emit('draw-line', {prevPoint, currentPoint, color});
    })
});

server.listen(3001, () => {
    console.log("http://localhost:3001");
});