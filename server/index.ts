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
    color : string
}

io.on('connection', (socket: Socket) => {
    console.log('a user connected');
    
    socket.on('client-ready' , () => {
        socket.broadcast.emit('get-canvas-state');
    })

    socket.on('canvas-state' , (canvasState : string) => {
        socket.broadcast.emit('canvas-state-from-server', canvasState);
    })

    socket.on('draw-line' , ({prevPoint, currentPoint, color} : DrawLine) => {
        socket.broadcast.emit('draw-line', {prevPoint, currentPoint, color});
    })

    socket.on('clear' , () => io.emit('clear'));
});

server.listen(3001, () => {
    console.log("http://localhost:3001");
});