import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 6001;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origin to connect to the website
  },
});

app.get("/", (req, res) => {
  res.send("The server is running");
});

io.on("connection", (socket) => {
  console.log("A new user has connected.");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

// Export the server and lobbyManager object for testing
export { server, io };
