const socketIO = require("socket.io");

exports.sio = (server) => {
  return socketIO(server, {
    transports: ["polling","websockets"],
    cors: {
      origin: "http://localhost:3000",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log("A user is connected");
    socket.on("chat message", (message) => {
      console.log(`message from ${socket.id} : ${message}`);
      io.emit('chat message',message);
    });
    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};