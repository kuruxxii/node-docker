import "dotenv/config";

const PORT: number = parseInt(process.env.PORT || "4000", 10);
const MONGO_IP: string = process.env.MONGO_IP || "mongo";
const MONGO_PORT: number = parseInt(process.env.MONGO_PORT || "27017", 10);
const MONGO_USER: string = process.env.MONGO_USER as string;
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD as string;
const REDIS_URL: string = `redis://redis:${parseInt(
  process.env.REDIS_PORT || "6379",
  10
)}`;
const SESSION_SECRET: string = process.env.SESSION_SECRET as string;

export {
  PORT,
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  REDIS_URL,
  SESSION_SECRET,
};
