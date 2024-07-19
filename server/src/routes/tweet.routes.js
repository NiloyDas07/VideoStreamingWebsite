import { Router } from "express";

import {
  verifyJWT,
  optionalVerifyJWT,
} from "../middlewares/auth.middleware.js";

import {
  createTweet,
  deleteTweet,
  getTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createTweet);
router.route("/user/:userId").get(getUserTweets);
router
  .route("/:tweetId")
  .get(optionalVerifyJWT, getTweet)
  .patch(verifyJWT, updateTweet)
  .delete(verifyJWT, deleteTweet);

export default router;
