const socketEvents = (io) =>{
    let connections = [];
    io.on('connection', (socket) => {
        
        // socket.on('',()=>{
    
        // });
    
        connections.push(socket);
        console.log(`Connected Sockets: ${connections.length}`);
        
        //disconnect
        socket.on('disconnect',(data) => {
            connections.splice(connections.indexOf(socket), 1);
            console.log('Disconnected: %s sockets connected', connections.length);
        });
    
    
    
        //Input events
        socket.on('send message',(data) => {
            io.emit('new message', {msg:data});
        });
        console.log(`Socket ID: ${socket.id}`);

        //REACT

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    });
});
    
};
module.exports = socketEvents;