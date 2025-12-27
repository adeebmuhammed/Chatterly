"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushToUser = exports.saveSubscription = void 0;
const web_push_1 = __importDefault(require("web-push"));
const constants_1 = require("./constants");
const response_helper_1 = require("./response.helper");
const inversify_1 = require("../config/inversify");
const types_1 = require("../config/types");
// DI
const subscriptionRepo = inversify_1.container.get(types_1.TYPES.ISubscriptionRepository);
// Set VAPID keys
web_push_1.default.setVapidDetails("mailto:your-email@gmail.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
// ---------------- SAVE SUBSCRIPTION ----------------
const saveSubscription = async (req, res) => {
    const userId = req.query.userId;
    const subscription = req.body;
    await subscriptionRepo.save(userId, subscription);
    res
        .status(constants_1.STATUS_CODES.OK)
        .json((0, response_helper_1.sendSuccess)("Subscription saved successfully"));
};
exports.saveSubscription = saveSubscription;
// ---------------- SEND PUSH TO USER ----------------
const sendPushToUser = async (userId, payload) => {
    const sub = await subscriptionRepo.getByUser(userId);
    if (!sub)
        return;
    try {
        await web_push_1.default.sendNotification(sub.subscription, JSON.stringify(payload));
    }
    catch (error) {
        console.error("Push notification error:", error);
    }
};
exports.sendPushToUser = sendPushToUser;
//# sourceMappingURL=notification.js.map