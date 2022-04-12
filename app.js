const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const SwaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Init configuration
const PORT = 3030;
let userId = 1;

let chats = [];

// Swagger
app.use("/swagger", SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));


// Express endpoints
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/messages", (req, res) => {
  res.send(chats);
});

app.delete("/messages", (req, res) => {
  chats = []
  io.emit("chat delete");
  res.send();
});


// Socket io
io.on("connection", (socket) => {
  let connections = socket.adapter.sids.size;
  let connectionsLeft = socket.adapter.sids.size - 1;

  // Connect user
  console.log(`New user connected, total connected: ${connections}`);

  //   Set user Id
  socket.on("user", () => {
    io.emit("user", userId);
    userId++;
  });

  //   get message
  socket.on("chat message", (msg) => {
    chats.push(msg);
    io.emit("chat message", msg);
  });

  // Disconect user
  socket.on("disconnect", () => {
    console.log(`User disconnected, total connected ${connectionsLeft}`);
  });
});


server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

