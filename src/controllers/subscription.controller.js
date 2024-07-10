import mongoose from "mongoose";

import { Subscription } from "../models/subscription.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller to toggle subscription.
const toggleSubscription = asyncHandler(async (req, res) => {
  let channelId;
  try {
    channelId = mongoose.Types.ObjectId.createFromHexString(
      req.params?.channelId?.trim()
    );
  } catch (error) {
    throw new ApiError(400, "Invalid channel id");
  }

  const { _id } = req.user;

  if (channelId.equals(_id)) {
    throw new ApiError(403, "Cannot subscribe to your own channel.");
  }

  const subscription = await Subscription.findOne({
    channel: channelId,
    subscriber: _id,
  });

  // if subscription exists, delete it, else create it.
  if (subscription) {
    const deleteResponse = await subscription.deleteOne();

    if (deleteResponse.deletedCount === 0) {
      throw new ApiError(500, "Failed to delete subscription.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Subscription deleted successfully."));
  } else {
    const newSubscription = await Subscription.create({
      channel: channelId,
      subscriber: _id,
    });

    if (!newSubscription) {
      throw new ApiError(500, "Failed to create subscription.");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          newSubscription,
          "Subscription created successfully."
        )
      );
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { pageNumber = 1, pageSize = 10, sort = "desc" } = req.query;

  const sortOrder = (sort = "desc" ? -1 : 1);

  const options = {
    page: parseInt(pageNumber),
    limit: parseInt(pageSize),
  };

  const subscribers = Subscription.aggregate([
    {
      $match: {
        channel: req.user._id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriberDetails",
      },
    },
    {
      $unwind: "$subscriberDetails",
    },
    {
      $project: {
        username: "$subscriberDetails.username",
        fullName: "$subscriberDetails.fullName",
        avatar: "$subscriberDetails.avatar",
        createdAt: "$createdAt",
      },
    },
    {
      $sort: { createdAt: sortOrder },
    },
  ]);

  const response = await Subscription.aggregatePaginate(subscribers, options);

  if (!response) {
    throw new ApiError(404, "Something went wrong while fetching subscribers.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        subscribers: response.docs,
        totalPages: response.totalPages,
        currentPage: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
      },
      "Subscribers fetched successfully."
    )
  );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { pageNumber = 1, pageSize = 10, sort = "desc" } = req.query;

  const sortOrder = (sort = "desc" ? -1 : 1);

  const options = {
    page: parseInt(pageNumber),
    limit: parseInt(pageSize),
  };

  const subscribedChannels = Subscription.aggregate([
    {
      $match: {
        subscriber: req.user._id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channelDetails",
      },
    },
    {
      $unwind: "$channelDetails",
    },
    {
      $project: {
        username: "$channelDetails.username", // channel username
        fullName: "$channelDetails.fullName", // channel full name
        avatar: "$channelDetails.avatar", // channel avatar
        createdAt: "$createdAt",
      },
    },
    {
      $sort: { createdAt: sortOrder },
    },
  ]);

  const response = await Subscription.aggregatePaginate(
    subscribedChannels,
    options
  );

  if (!response) {
    throw new ApiError(
      404,
      "Something went wrong while fetching subscribed channels."
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        subscribedChannels: response.docs,
        totalPages: response.totalPages,
        currentPage: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
      },
      "Subscribed channels fetched successfully."
    )
  );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
