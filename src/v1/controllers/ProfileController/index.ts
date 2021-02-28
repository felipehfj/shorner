import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { connect } from 'mongoose';

import Profile, { IProfile } from "../../models/Profile";
import User, { IUser } from "../../models/User";
import db from '../../../database/config';

class ProfileController {
  constructor() {
    this.databaseConnect();
  }
  databaseConnect() {
    connect(db.uri, db.options);
  }
  // @route   GET api/profile/me
  // @desc    Get current user's profile
  // @access  Private
  async me(req: Request, res: Response) {
    try {
      const profile: IProfile | null = await Profile.findOne({
        user: res.locals.jwtPayload.userId,
      }).populate("user", ["avatar", "email"]);
      if (!profile) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "There is no profile for this user",
            },
          ],
        });
      }

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
  // @route   POST api/profile
  // @desc    Create or update user's profile
  // @access  Private
  async updateProfile(req: Request, res: Response) {
    const { firstName, lastName, username } = req.body;

    // Build profile object based on IProfile
    const profileFields = {
      user: res.locals.jwtPayload.userId,
      firstName,
      lastName,
      username,
    };

    try {
      let user: IUser | null = await User.findOne({ _id: res.locals.jwtPayload.userId });

      if (!user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "User not registered",
            },
          ],
        });
      }

      let profile: IProfile | null = await Profile.findOne({ user: res.locals.jwtPayload.userId });
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: res.locals.jwtPayload.userId },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
  // @route   GET api/profile
  // @desc    Get all profiles
  // @access  Public
  async index(req: Request, res: Response) {
    try {
      const profiles = await Profile.find().populate("user", ["avatar", "email"]);
      return res.json(profiles);
    } catch (err) {
      console.error(err.message);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
  // @route   GET api/profile/user/:userId
  // @desc    Get profile by userId
  // @access  Public
  async getOne(req: Request, res: Response) {
    try {
      const profile: IProfile | null = await Profile.findOne({
        user: req.params.userId,
      }).populate("user", ["avatar", "email"]);

      if (!profile)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ msg: "Profile not found" });
      }
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  // @route   DELETE api/profile
  // @desc    Delete profile and user
  // @access  Private
  async delete(req: Request, res: Response) {
    try {
      const userId: string = res.locals.jwtPayload.userId;
      // Remove profile
      await Profile.findOneAndRemove({ user: userId });
      // Remove user
      await User.findOneAndRemove({ _id: userId });

      return res.json({ msg: "User removed" });
    } catch (err) {
      console.error(err.message);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}

export default new ProfileController();