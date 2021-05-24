const socket = io();
// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocation = document.querySelector("#send-location");
// Receive the event the server sent to client
socket.on("message", (message) => console.log(message));

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // disable the form once submitted
  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, (error) => {
    // Enable the form
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    // Move the focus back to the input field

    if (error) return console.log(error);
    console.log("Message delivered!");
  });
});

$sendLocation.addEventListener("click", () => {
  if (!navigator.geolocation)
    return alert("Geolocation is not supported by your browser");

  // Disable the send location after sent
  $sendLocation.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position, callback) => {
    // console.log(position);
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        // Enable sendLocation
        $sendLocation.removeAttribute("disabled");
        console.log("Location shared!");
      }
    );
  });
});

// Acknowledgement
// server(emit) --> client(receive) --acknowledgement-->server
// client(emit) --> server(receive) --acknowledgement-->client
