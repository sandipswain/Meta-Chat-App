const socket = io();
const submit = document.querySelector("#message-form");
const sendLocation = document.querySelector("#send-location");
// Receive the event the server sent to client
socket.on("message", (message) => console.log(message));

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message);
});

sendLocation.addEventListener("click", () => {
  if (!navigator.geolocation)
    return alert("Geolocation is not supported by your browser");

  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position);
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});
