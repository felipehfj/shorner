import dotenv from 'dotenv';
import { Response, Request, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

dotenv.config();

function getBearerToken(str: string): string {
  return str.replace(/^Bearer\s/i, '')
}


export default function (req: Request, res: Response, next: NextFunction) {
  // Get token from header
  let bearer = req.header("authorization");

  const token = getBearerToken(bearer ?? '');

  // Check if no token
  if (!token) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "No token, authorization denied" });
  }
  // Verify token
  try {        
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET || '');
    res.locals.jwtPayload = jwtPayload;
    next();
  } catch (err) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "Token is not valid" });
  }
}