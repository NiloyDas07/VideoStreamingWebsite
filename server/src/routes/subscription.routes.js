import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  toggleSubscription,
  getSubscribedChannels,
  getUserChannelSubscribers,
  isSubscribed,
} from "../controllers/subscription.controller.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/channel/:channelId").get(isSubscribed).post(toggleSubscription);

router.route("/user/subscribers/").get(getUserChannelSubscribers); // Only for channel owner (logged in user).

router.route("/user/subscribed-to/").get(getSubscribedChannels); // Only for verified(logged in) user.

export default router;
