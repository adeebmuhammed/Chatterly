import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import routes from "./routes/routes";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { socketHandler } from "./helpers/socket-io";

const app = express();
app.use(express.json());
connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Create HTTP server
const server = http.createServer(app);

// Init Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// Attach custom socket handler
socketHandler(io);

// Attach IO to app (optional)
app.set("io", io);

// API routes
app.use("/api", routes);

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
