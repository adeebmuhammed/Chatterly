import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import routes from "./routes/routes";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { sendPushNotification } from "./utils/notification";

const app = express();
app.use(express.json());

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

  socket.on("registerUser", (userId: string) => {
    socket.join(userId); // Join personal user room
    console.log(`User ${socket.id} registered as ${userId}`);
  });

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

    const messageData = {
      title: "New Message",
      body: data.message,
      chatId: data.chatId,
      senderId: data.senderId,
    };

    sendPushNotification(messageData);

    // 1️⃣ Send to users inside the chat room
    io.to(data.chatId).emit("receiveMessage", messageToSend);

    // 2️⃣ Notify the other user
    const receiverId = data.receiverId; // ADD THIS IN PAYLOAD
    io.to(receiverId).emit("newMessageNotification", {
      chatId: data.chatId,
      message: data.message,
      senderId: data.senderId,
      createdAt: new Date(),
    });
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
