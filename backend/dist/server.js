"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socket_io_2 = require("./helpers/socket-io");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, db_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
// Create HTTP server
const server = http_1.default.createServer(app);
// Init Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
});
// Attach custom socket handler
(0, socket_io_2.socketHandler)(io);
// Attach IO to app (optional)
app.set("io", io);
// API routes
app.use("/api", routes_1.default);
// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map