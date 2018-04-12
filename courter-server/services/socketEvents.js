const mongoose = require('mongoose');
const { Schema } = mongoose;
const Message = require('../models/messageSchema');

const socketEvents = (io) => {
    let connections = [];
    io.on('connection', (socket) => {
        connections.push(socket);
        console.log(`Connected Sockets: ${connections.length}`);


        socket.on('room', (room) => {
            socket.join(room);
        });

        //disconnect
        socket.on('disconnect', (data) => {
            connections.splice(connections.indexOf(socket), 1);
            console.log('Disconnected: %s sockets connected', connections.length);
        });


        socket.on('SEND_MESSAGE', function (data) {
            new Message({
                message: data.message,
                author: data.user,
                chat: data.chat
            }).save((err, product) => {
                data._id = product._id;
                io.sockets.in(data.chat).emit('RECEIVE_MESSAGE', data);
            })



        });

    });

};
module.exports = socketEvents;