import { Server, Socket } from "socket.io";
import { sendPushNotification } from "../utils/notification";
import { USER_ACTIVE_STATUS } from "../utils/constants";
import { container } from "../config/inversify";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { TYPES } from "../config/types";

const _userRepo = container.get<IUserRepository>(TYPES.IUserRepository);

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Register user
    socket.on("registerUser", async (userId: string) => {
      socket.join(userId);
      socket.data.userId = userId; // store for disconnect

      // ✅ Mark user ONLINE
      await _userRepo.update(userId, {
        status: USER_ACTIVE_STATUS.ONLINE,
        lastSeen: null,
      });

      socket.broadcast.emit("userStatusChanged", {
        userId,
        status: USER_ACTIVE_STATUS.ONLINE,
      });

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

    // User started typing
    socket.on("typing:start", (data) => {
      const { chatId, userId } = data;

      // Notify others in the chat room
      socket.to(chatId).emit("userTyping", {
        chatId,
        userId,
        isTyping: true,
      });
    });

    // User stopped typing
    socket.on("typing:stop", (data) => {
      const { chatId, userId } = data;

      socket.to(chatId).emit("userTyping", {
        chatId,
        userId,
        isTyping: false,
      });
    });

    socket.on("deleteMessage", (data) => {
      const { chatId, messageId } = data;

      // Broadcast to everyone in the chat room
      io.to(chatId).emit("messageDeleted", {
        chatId,
        messageId,
      });
    });

    // Disconnect
    socket.on("disconnect", async () => {
      const userId = socket.data.userId;
      if (!userId) return;

      // ✅ Mark user OFFLINE
      await _userRepo.update(userId, {
        status: USER_ACTIVE_STATUS.OFFLINE,
        lastSeen: new Date(),
      });

      // Notify others
      socket.broadcast.emit("userStatusChanged", {
        userId,
        status: USER_ACTIVE_STATUS.OFFLINE,
        lastSeen: new Date(),
      });

      console.log("User disconnected:", socket.id);
    });
  });
};
