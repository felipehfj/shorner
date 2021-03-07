import { Request, Response } from 'express';
import { connect } from 'mongoose';

import Url, { IUrl } from "../../models/UrlModel";
import UrlAccess from "../../models/UrlAccessModel";
import db from '../../../database/config';
import { nanoid } from 'nanoid';

class UrlController {
  constructor() {
    this.databaseConnect();
  }
  databaseConnect() {
    connect(db.uri, db.options);
  }

  async redirect(req: Request, res: Response) {
    const { shortId } = req.params;

    if (!shortId) return res.status(400).json({ msg: "id not provided" });

    try {
      const URL = await Url.findOne({ shortId });
      if (!URL) return res.status(400).json({ msg: "invalid url id" });

      await UrlAccess.create({ url: URL._id });

      return res.redirect(URL.url);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "some error occured" });
    }
  }

  async create(req: Request, res: Response) {
    const { url } = req.body;

    if (!url) return res.status(400).json({ msg: "url not provided" });

    try {
      let URL = await Url.findOne({ url });
      if (!URL) {
        let newURL = new Url({ url });

        let hasOne: IUrl | null = null;
        do {
          hasOne = await Url.findOne({ shortId: newURL.shortId });
          if (hasOne) {
            newURL.shortId = nanoid(10);
          }
        } while (!!hasOne)


        await newURL.save();
        return res.status(201).json({ shortId: newURL.shortId, url });
      }

      return res.status(200).json({ shortId: URL.shortId, url });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "some error occured" });
    }
  }

  async count(req: Request, res: Response) {
    const { shortId } = req.body;

    if (!shortId) return res.status(400).json({ msg: "id not provided" });

    try {
      const URL = await Url.findOne({ shortId });
      if (!URL) return res.status(400).json({ msg: "invalid url id" });

      let aggrCount = await UrlAccess.aggregate([{ $match: { url: { $eq: URL._id } } }, { $count: 'count' }]);

      if (aggrCount && aggrCount.length > 0) {
        var { count } = aggrCount[0];
      }
      if (!count) {
        count = 0;
      }

      return res.status(200).json({ shortId: URL.shortId, count: count });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "some error occured" });
    }
  }
}

export default new UrlController();
