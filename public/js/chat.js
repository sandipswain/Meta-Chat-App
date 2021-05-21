const socket = io();
const sub = document.querySelector("#message-form");
// Receive the event the server sent to client
socket.on("message", (message) => console.log(message));

sub.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message);
});
