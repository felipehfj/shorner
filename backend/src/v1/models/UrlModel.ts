import { Document, Schema, Model, model } from "mongoose";
import { nanoid } from "nanoid";

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
      default: nanoid(10),
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