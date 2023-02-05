const express = require("express")
const morgan = require("morgan")
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("se conecto un usuario");

  socket.on("message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("msg", {
      body: msg,
      from: socket.id,
    });
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`se escucha en el puerto ${PORT}`);
});