import mongoose, { Schema, model } from "mongoose";

const subscriptionSchema = new Schema({
  channel: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Subscription = model("Subscription", subscriptionSchema);
