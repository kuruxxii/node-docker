import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
};
