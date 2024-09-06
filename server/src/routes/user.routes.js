import { Router } from "express";

import {
  addVideoToWatchHistory,
  changeUserPassword,
  deleteAccount,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import {
  optionalVerifyJWT,
  verifyJWT,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

// Routes that check for login status.
router
  .route("/channel/:channelName")
  .get(optionalVerifyJWT, getUserChannelProfile);

// Secured routes.
router.route("/change-password").patch(verifyJWT, changeUserPassword);

router.route("/user/current").get(verifyJWT, getCurrentUser);

router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router
  .route("/change-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/change-cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/watch-history").get(verifyJWT, getWatchHistory);

router
  .route("/watch-history/:videoId")
  .patch(verifyJWT, addVideoToWatchHistory);

router.route("/delete-account").delete(verifyJWT, deleteAccount);

export default router;
