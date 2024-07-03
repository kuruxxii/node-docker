import mongoose from "mongoose";
const { Schema, model } = mongoose;
import type { Post } from "../lib/definitions";

const postSchema = new Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const PostModel = model("Post", postSchema);
