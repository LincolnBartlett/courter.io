const { Schema } = require("mongoose"),
      Message = require("../models/messageSchema");

const socketEvents = io => {
  let connections = [];
  io.on("connection", socket => {
    connections.push(socket);
    console.log(`Sockets: ${connections.length}`);

    socket.on("room", room => {
      socket.join(room);
    });

    //disconnect
    socket.on("disconnect", data => {
      connections.splice(connections.indexOf(socket), 1);
      console.log(`Sockets: ${connections.length}`);
    });

    socket.on("SEND_MESSAGE", function(data) {
      new Message({
        message: data.message,
        author: data.user,
        chat: data.chat
      }).save((err, newMessage) => {
        data._id = newMessage._id;
        data.timeStamp = newMessage.timeStamp;
        io.sockets.in(data.chat).emit("RECEIVE_MESSAGE", data);
      });
    });
  });
};

module.exports = socketEvents;
