import mongoose from "mongoose";
const { Schema, model } = mongoose;
import type { User } from "../lib/definitions";

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true, immutable: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", userSchema);
