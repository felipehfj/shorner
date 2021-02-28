import bcrypt from "bcryptjs";
import { Response, Request } from "express";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import {connect} from 'mongoose';

import User from "../../models/User";
import db from '../../../database/config';

class AuthController {
  constructor() {
    this.databaseConnect();
  }
  databaseConnect() {
    connect(db.uri, db.options);
  }
  // @route   GET api/auth
  // @desc    Get authenticated user given the token
  // @access  Private
  async getUser(req: Request, res: Response) {
    try {
      const user = await User.findById(res.locals.jwtPayload.userId).select("-password");
      if (!user) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({ errors: [{ msg: 'User not found' }] })
      } else {
        return res.json(user);
      }
    } catch (err) {
      console.error(err.message);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
  // @route   POST api/auth
  // @desc    Login user and get token
  // @access  Public
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      } else {
        var isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          res.status(HttpStatusCodes.BAD_REQUEST).json({
            errors: [
              {
                msg: "Invalid Credentials"
              }
            ]
          });
        }

        var jwtPayload: { userId: String, avatar: string } = { userId: user.id, avatar: user.avatar };

        jwt.sign(
          jwtPayload,
          process.env.JWT_SECRET || "",
          { expiresIn: process.env.JWT_EXPIRATION || '2h' },
          (err, token) => {
            if (err) throw err;
            return res.json({ token });
          }
        );
      }

    } catch (err) {
      console.error(err.message);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}

export default new AuthController();