import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  createTweet,
  deleteTweet,
  getTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createTweet);
router.route("/user/:username").get(getUserTweets);
router.route("/:tweetId").get(getTweet).patch(updateTweet).delete(deleteTweet);

export default router;
