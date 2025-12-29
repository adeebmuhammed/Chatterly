"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const constants_1 = require("../utils/constants");
const inversify_1 = require("../config/inversify");
const types_1 = require("../config/types");
const notification_1 = require("../utils/notification");
const _userRepo = inversify_1.container.get(types_1.TYPES.IUserRepository);
const notificationRepo = inversify_1.container.get(types_1.TYPES.INotificationRepository);
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        // Register user
        socket.on("registerUser", async (userId) => {
            socket.join(userId);
            socket.data.userId = userId; // store for disconnect
            // ✅ Mark user ONLINE
            await _userRepo.update(userId, {
                status: constants_1.USER_ACTIVE_STATUS.ONLINE,
                lastSeen: null,
            });
            socket.broadcast.emit("userStatusChanged", {
                userId,
                status: constants_1.USER_ACTIVE_STATUS.ONLINE,
            });
            console.log(`User ${socket.id} registered as ${userId}`);
        });
        // Join chat room
        socket.on("joinRoom", (chatId) => {
            socket.join(chatId);
            console.log(`User ${socket.id} joined room ${chatId}`);
        });
        socket.on("sendMessage", async (data) => {
            const messageToSend = {
                chatId: data.chatId,
                sender: { _id: data.senderId },
                message: data.message || "",
                messageType: data.messageType || constants_1.FILE_TYPES.TEXT,
                fileUrl: data.mediaUrl || null,
                createdAt: new Date(),
            };
            io.to(data.chatId).emit("receiveMessage", messageToSend);
            const previewText = data.messageType === constants_1.FILE_TYPES.IMAGE
                ? "Image"
                : data.messageType === constants_1.FILE_TYPES.FILE
                    ? "File"
                    : data.message || "New message";
            // GROUP CHAT
            if (Array.isArray(data.receiverIds)) {
                for (const userId of data.receiverIds) {
                    if (userId === data.senderId)
                        continue;
                    // 💾 SAVE notification
                    await notificationRepo.createNotification({
                        userId,
                        title: "New Message",
                        body: data.message,
                        chatId: data.chatId,
                        senderId: data.senderId,
                    });
                    // 🔔 socket
                    io.to(userId).emit("newMessageNotification", {
                        chatId: data.chatId,
                        message: data.message,
                        senderId: data.senderId,
                        createdAt: new Date(),
                    });
                    // 📱 push
                    await (0, notification_1.sendPushToUser)(userId, {
                        title: "New Message",
                        body: data.message,
                        chatId: data.chatId,
                        senderId: data.senderId,
                    });
                }
                return;
            }
            // 1-to-1 CHAT
            if (data.receiverId) {
                await notificationRepo.createNotification({
                    userId: data.receiverId,
                    title: "New Message",
                    body: previewText,
                    chatId: data.chatId,
                    senderId: data.senderId,
                });
                io.to(data.receiverId).emit("newMessageNotification", {
                    chatId: data.chatId,
                    message: data.message,
                    senderId: data.senderId,
                    createdAt: new Date(),
                });
                await (0, notification_1.sendPushToUser)(data.receiverId, {
                    title: "New Message",
                    body: data.message,
                    chatId: data.chatId,
                    senderId: data.senderId,
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
            if (!userId)
                return;
            // ✅ Mark user OFFLINE
            await _userRepo.update(userId, {
                status: constants_1.USER_ACTIVE_STATUS.OFFLINE,
                lastSeen: new Date(),
            });
            // Notify others
            socket.broadcast.emit("userStatusChanged", {
                userId,
                status: constants_1.USER_ACTIVE_STATUS.OFFLINE,
                lastSeen: new Date(),
            });
            console.log("User disconnected:", socket.id);
        });
    });
};
exports.socketHandler = socketHandler;
//# sourceMappingURL=socket-io.js.map