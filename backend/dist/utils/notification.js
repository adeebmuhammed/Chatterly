"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = exports.saveSubscription = void 0;
const web_push_1 = __importDefault(require("web-push"));
const constants_1 = require("./constants");
const response_helper_1 = require("./response.helper");
// Set VAPID keys
web_push_1.default.setVapidDetails("mailto:your-email@gmail.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
let subscriptions = []; // Ideally store in DB
const saveSubscription = (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(constants_1.STATUS_CODES.OK).json((0, response_helper_1.sendSuccess)("Subscription saved successfully"));
};
exports.saveSubscription = saveSubscription;
// Function to send push notification
const sendPushNotification = (payload) => {
    subscriptions.forEach((sub) => {
        web_push_1.default.sendNotification(sub, JSON.stringify(payload)).catch(console.error);
    });
};
exports.sendPushNotification = sendPushNotification;
//# sourceMappingURL=notification.js.map