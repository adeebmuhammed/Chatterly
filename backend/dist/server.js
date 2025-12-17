"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
(0, db_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
// --- Create HTTP server wrapper (needed for Socket.IO) ---
const server = http_1.default.createServer(app);
// --- Initialize Socket.IO ---
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
});
// --- Socket.IO Handlers ---
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    // Join room
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });
    // Receive message and broadcast to room
    socket.on("sendMessage", (data) => {
        io.to(data.roomId).emit("receiveMessage", data);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
// --- Attach IO to app (optional but useful in services) ---
app.set("io", io);
// --- API Routes ---
app.use("/api", routes_1.default);
// --- Start server ---
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map