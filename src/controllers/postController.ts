import { Request, Response } from "express";
import { PostModel } from "../models/postModel";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find({});
    if (!posts) {
      return res.status(404).json({ status: "posts not found" });
    } else {
      return res.status(200).json({
        status: "success",
        result: posts.length,
        data: {
          posts,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const getOnePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ status: "post not found" });
    } else {
      return res.status(200).json({
        status: "success",
        data: {
          post,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  try {
    const post = await PostModel.create({ title, body });
    return res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const post = await PostModel.findByIdAndUpdate(
      id,
      { title, body },
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ status: "post not found" });
    } else {
      return res.status(200).json({
        status: "success",
        data: {
          post,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ status: "post not found" });
    } else {
      return res.status(200).json({
        status: "success",
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
