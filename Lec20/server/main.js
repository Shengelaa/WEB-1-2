const http = require("http");
const express = require("express");

const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected successfully`);
  socket.on("echoReciever", (data) => {
    console.log(data, "from echo server");
    socket.emit("echoSender", data);
  });

  socket.on("groupChat", (data) => {
    console.log(data, "data from group chat");
    //!it send smessage all connected users expect sender
    //TODO socket.broadcast.emit("groupChat", data);

    io.emit("groupChat", data);
  });

  socket.on("joinRoom", ({ roomId, userEmail }) => {
    socket.join(roomId);
    console.log(`${userEmail} Joined ${roomId}`);
  });

  socket.on("privateMessage", ({ roomId, userEmail, msg }) => {
    io.to(roomId).emit("privateMessage", { roomId, userEmail, msg });
  });
});

server.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});
