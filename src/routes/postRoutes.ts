import { Router } from "express";
import {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
