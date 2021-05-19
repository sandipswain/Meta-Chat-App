const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

// Define path for express config
const publicDirpath = path.join(__dirname, "../public");

// Setup static directory to serve
app.use(express.static(publicDirpath));

// Listening for a given event to occur
io.on("connection", () => {
  console.log("New Websocket Connection");
});

// Port access
server.listen(port, () => {
  console.log(`Server is up on PORT ${port}`);
});
