const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {},
});

//THE IO HERE IS FOR THE ENTIRE SOCKET SERVER
io.on("connection", (socket) => {
  console.log(`User Connected:${socket.id}`);

  io.emit("welcome", "Welcome message from socket");

  //WE SOCKET HERE BECAUSE FOR THE SPECIFIC USER'S SOCKET
  socket.on("send_message", (data) => {
    console.log("The message is", data);

    //Will emit the data except the sender
    // socket.broadcast.emit("receive_message", data);

    //TO EMIT IT TO A SPECIFIC ROOM/PERSON
    //THE MESSAGE WILL BE DISPLAYED ONLY IN THE RECEIVER SIDE
    socket.to(data.room).emit("receive_message", data);

    //THE IO HERE IS FOR THE ENTIRE SOCKET SERVER
    // io.emit("receive_message", data);
    //SO IF I WANT THE SENDER AND RECEIVER OF THE SAME ROOM RECIEVE THE SAME MESSAGE WHILE SENDING,
    //THE MESSAGE WILL BE RECEIVED BY BOTH PARTIES
    // io.to(data.room).emit("receive_message", data);
  });

  //TO JOIN A ROOM
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3001, () => {
  console.log(`Server listening on 3001`);
});
