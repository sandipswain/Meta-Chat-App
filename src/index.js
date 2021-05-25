const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { generateMessage } = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

// Define path for express config
const publicDirpath = path.join(__dirname, "../public");

// Setup static directory to serve
app.use(express.static(publicDirpath));

let count = 0;

// server (emit) --> client (receive) = countUpdated
// client (emit) --> server (receive) = increment

// Listening for a given event to occur
io.on("connection", (socket) => {
  console.log("New Websocket Connection");

  socket.emit("message", generateMessage("Welcome!"));
  // Broadcast lets everyone know that the user has joined except the user that has joined
  socket.broadcast.emit("message", generateMessage("A new user has joined!"));

  // Listening an event from a client
  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }
    // This emits the event to evry connected client
    io.emit("message", generateMessage(message));
    callback("Delivered");
  });

  // To notify all Users that a user has shared its location
  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "locationMessage",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    callback();
  });

  // To notify all the clients connected to the server when the user gets disconnected
  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has left the server"));
  });
});

// Port access
server.listen(port, () => {
  console.log(`Server is up on PORT ${port}`);
});
