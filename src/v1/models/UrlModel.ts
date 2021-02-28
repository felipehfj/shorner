import { Document, Schema, Model, model } from "mongoose";
import shortid from "shortid";

shortid.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_");

export interface IUrl extends Document {
  url: string,
  shortId: string,
  date: Date
}

const UrlSchema: Schema = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    shortId: {
      type: String,
      required: true,
      default: shortid.generate(),
      unique: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);


const Url: Model<IUrl> = model<IUrl>("Url", UrlSchema);
export default Url;