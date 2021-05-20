const socket = io();
// Receive the event the server sent to client
socket.on("countUpdated", (count) => {
  console.log("The Count has been updated", count);
});

document.getElementById("increment").addEventListener("click", () => {
  console.log("Clicked to the terminal");
  socket.emit("increment");
});
