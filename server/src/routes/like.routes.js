import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  getLikedVideos,
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  isLiked,
  countLikes,
} from "../controllers/like.controller.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/videos").get(getLikedVideos);
router.route("/count/:contentId").get(countLikes);
router.route("/toggle/video/:videoId").post(toggleVideoLike);
router.route("/toggle/comment/:commentId").post(toggleCommentLike);
router.route("/toggle/tweet/:tweetId").post(toggleTweetLike);
router.route("/:contentId").get(isLiked);

export default router;
