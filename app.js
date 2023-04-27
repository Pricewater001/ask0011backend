

const express = require("express");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {

console.log("connected")
  socket.on("message", (message) => {
    io.emit("message", {
      text: message,
      createdAt: new Date(),
      _id: socket.id,
      user: {
        _id: socket.id,
        name: "USER" + socket.id.slice(0, 5),
      },
    });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 3002;

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

