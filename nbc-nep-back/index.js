// const app = require("express")();
// const server = require("http").createServer(app);
// const cors = require("cors");
//
// const io = require("socket.io")(server);
// app.use(
//   cors({
//     origin: "http://localhost:3000", // 클라이언트 주소
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
//
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
// // 일단 들어오면 소켓을 연결을 해야 한다.
// io.on("connection", (socket) => {
//   console.log("socket connected");
//
//   socket.on("offer", (offer) => {
//     socket.broadcast.emit("offer", offer);
//   });
//   socket.on("answer", (answer) => {
//     socket.broadcast.emit("answer", answer);
//   });
//   socket.on("ice", (ice) => {
//     socket.broadcast.emit("ice", ice);
//   });
// });
//
// server.listen(3001, () => {
//   console.log("Server listening on port 3000");
// });

const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
let server = http.Server(app);
let io = socketIO(server, {
  pingTimeout: 60000,
});

app.set("port", 3003);
app.use("/static", express.static(__dirname + "/static"));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "index.html"));
});

server.listen(3003, function () {
  console.log("Starting server on port 3003");
});

let players = {};

io.on("connection", function (socket) {
  console.log("player [" + socket.id + "] connected");

  players[socket.id] = {
    rotation: 0,
    x: 30,
    y: 30,
    playerId: socket.id,
    color: getRandomColor(),
  };
  socket.emit("currentPlayers", players);
  socket.broadcast.emit("newPlayer", players[socket.id]);

  socket.on("disconnect", function () {
    console.log("player [" + socket.id + "] disconnected");
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });

  socket.on("playerMovement", function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].rotation = movementData.rotation;

    socket.broadcast.emit("playerMoved", players[socket.id]);
  });
});

function getRandomColor() {
  return "0x" + Math.floor(Math.random() * 16777215).toString(16);
}
