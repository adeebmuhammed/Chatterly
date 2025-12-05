import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import routes from "./routes/routes";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// --- Create HTTP server wrapper (needed for Socket.IO) ---
const server = http.createServer(app);

// --- Initialize Socket.IO ---
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// --- Socket.IO Handlers ---
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room
  socket.on("joinRoom", (chatId: string) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined room ${chatId}`);
  });

  // Receive message and broadcast to room
  socket.on("sendMessage", (data) => {
    const messageToSend = {
      chatId: data.chatId,
      sender: { _id: data.senderId },
      message: data.message,
      createdAt: new Date(),
    };

    io.to(data.chatId).emit("receiveMessage", messageToSend);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// --- Attach IO to app (optional but useful in services) ---
app.set("io", io);

// --- API Routes ---
app.use("/api", routes);

// --- Start server ---
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
