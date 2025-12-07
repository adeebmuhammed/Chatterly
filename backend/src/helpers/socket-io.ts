import { Server, Socket } from "socket.io";
import { sendPushNotification } from "../utils/notification";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Register user
    socket.on("registerUser", (userId: string) => {
      socket.join(userId);
      console.log(`User ${socket.id} registered as ${userId}`);
    });

    // Join chat room
    socket.on("joinRoom", (chatId: string) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined room ${chatId}`);
    });

    // Send message
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

      // Broadcast to chat room
      io.to(data.chatId).emit("receiveMessage", messageToSend);

      // Notify receiver (1-on-1 only)
      if (data.receiverId) {
        io.to(data.receiverId).emit("newMessageNotification", {
          chatId: data.chatId,
          message: data.message,
          senderId: data.senderId,
          createdAt: new Date(),
        });
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
