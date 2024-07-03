import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import cors from "cors";
import {
  PORT,
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  REDIS_URL,
  SESSION_SECRET,
} from "./config/config";
import { authMiddleware } from "./middleware/authMiddleware";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

function connectWithRetry(): void {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("connected to database");
      app.listen(PORT, () => {
        console.log("listening for requests on port", PORT);
      });
    })
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
}
connectWithRetry();

let redisClient = createClient({
  url: REDIS_URL,
});
redisClient
  .connect()
  .then(() => {
    console.log("connected to Redis.");
  })
  .catch(console.error);

app.enable("trust proxy");
app.use(cors());
app.use(morgan(":method :url :status - :response-time ms"));
app.use(express.json());
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
    }),
    secret: SESSION_SECRET,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 600000 * 60 * 24 * 60,
    },
  })
);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", authMiddleware, postRouter);
