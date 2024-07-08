import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyTweetOwner } from "../middlewares/verifyTweetOwner.middleware.js";

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
router
  .route("/:tweetId")
  .get(getTweet)
  .patch(verifyTweetOwner, updateTweet)
  .delete(verifyTweetOwner, deleteTweet);

export default router;
