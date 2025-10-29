const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

let config = require("./config/dotenv");
let corsOptions = require("./config/corsOptions");

// Routes
const userRoutes = require("./routes/user.routes");
const teamRoutes = require("./routes/team.routes");
const boardRoutes = require("./routes/board.routes");
const taskRoutes = require("./routes/task.routes");

let app = express();
const server = http.createServer(app); // Create HTTP server for Socket.IO
const io = new Server(server, { cors: { origin: "*" } }); // Socket.IO with CORS

// Socket.IO events
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("taskUpdated", (data) => {
    io.emit("taskUpdated", data);
  });

  socket.on("boardUpdated", (data) => {
    io.emit("boardUpdated", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB
mongoose
  .connect(config.MONGO_URL)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start server
server.listen(config.PORT, () => {
  console.log("Server is online!");
});
