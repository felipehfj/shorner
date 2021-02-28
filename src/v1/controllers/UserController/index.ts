import { NextFunction, Response, Request } from "express";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import { connect } from 'mongoose';

import PasswordUtils from '../../../utils/passwordUtils';
import AvatarUtils from '../../../utils/avatarUtils';
import User, { IUser } from "../../models/User";
import db from '../../../database/config';

class UserController {
  constructor() {
    this.databaseConnect();
  }
  databaseConnect() {
    connect(db.uri, db.options);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      let user: IUser | null = await User.findOne({ email });

      if (user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "User already exists"
            }
          ]
        });
      } else {

        //generate Avatar
        const avatar = AvatarUtils.avatarUrl(email);
        // hash password
        const hashed = await PasswordUtils.encrypt(password);
        // Build user object based on IUser
        const userFields = {
          email,
          password: hashed,
          avatar
        };

        user = new User(userFields);

        await user.save();

        var jwtPayload: { userId: String, avatar: string } = { userId: user.id, avatar: user.avatar };

        jwt.sign(
          jwtPayload,
          process.env.JWT_SECRET || "",
          { expiresIn: process.env.JWT_EXPIRATION || '2h' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
            next();
          }
        );
      }

    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}

export default new UserController();