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

      // Push notification message
      const messageData = {
        title: "New Message",
        body: data.message,
        chatId: data.chatId,
        senderId: data.senderId,
      };

      sendPushNotification(messageData);

      // Broadcast message to room (group chat OR normal chat)
      io.to(data.chatId).emit("receiveMessage", messageToSend);

      // --- NEW: Group chat notifications ---
      if (Array.isArray(data.receiverIds)) {
        data.receiverIds
          .filter((id: string) => id !== data.senderId) // don't notify self
          .forEach((userId: string) => {
            io.to(userId).emit("newMessageNotification", {
              chatId: data.chatId,
              message: data.message,
              senderId: data.senderId,
              createdAt: new Date(),
            });
          });

        return; // done for group messages
      }

      // --- Old: 1-on-1 chat fallback ---
      if (data.receiverId) {
        io.to(data.receiverId).emit("newMessageNotification", {
          chatId: data.chatId,
          message: data.message,
          senderId: data.senderId,
          createdAt: new Date(),
        });
      }
    });

    socket.on("joinGroupEvent", (data) => {
      const { chatId, user } = data;

      // Notify everyone in the group
      io.to(chatId).emit("groupJoined", {
        chatId,
        user, // {_id, name}
      });
    });

    socket.on("leaveGroupEvent", (data) => {
      const { chatId, userId } = data;

      // Notify everyone in the group
      io.to(chatId).emit("groupLeft", {
        chatId,
        userId,
      });
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
