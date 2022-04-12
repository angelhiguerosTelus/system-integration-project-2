var socket = io();

let messageInput = document.querySelector("#message-input");
let messageBtn = document.querySelector("#message-btn");
let saveUsernameBtn = document.querySelector("#saveUsernameBtn");
let usernameH5 = document.querySelector("#username");
let newUsernameInput = document.querySelector("#new-username-input");
let cards = document.querySelector("#card-body");

// init config
let username = `User`;
let isActive = false;

// Events --------------------------
messageInput.addEventListener("keydown", (e) => {
  let message = e.target.value;
  if (message && e.keyCode === 13) {
    socket.emit("chat message", { username, message });
    messageInput.value = "";
  }
});

messageBtn.addEventListener("click", (e) => {
  let message = messageInput.value;
  if (message) {
    socket.emit("chat message", { username, message });
    messageInput.value = "";
  }
});

saveUsernameBtn.addEventListener("click", (e) => {
  console.log(messageInput.value);
  let { username:name } = setNewUsername(username, usernameH5, newUsernameInput.value);
  username = name;
});

// Socket io --------------------------
// Get user id
socket.emit("user");
socket.on("user", (id) => {
  if (!isActive) {
    usernameH5.innerHTML = `User ${id}`;
    newUsernameInput.value = `User ${id}`;
    username = `User ${id}`;
  }

  isActive = true;
});

// Delete chats
socket.on("chat delete", (id) => {
  cards.innerHTML = "";
});

// Add message
socket.on("chat message", (msg) => {
  let date = moment().format(" DD/MM/YYYY h:mm:ss a");

  if (username == msg.username) {
    let newMsg = createElement("Me", msg.message, "justify-content-end", date);
    cards.append(newMsg);
  } else {
    let newMsg = createElement(
      msg.username,
      msg.message,
      "justify-content-start",
      date
    );
    cards.append(newMsg);
  }

  cards.scrollTo(0, document.body.scrollHeight);
});
