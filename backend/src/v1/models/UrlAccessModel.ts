import { Document, Schema, model, Model } from "mongoose";
import { IUrl } from './UrlModel';

export interface IUrlAccess extends Document {
  url: IUrl["_id"],
  access: Date
}

const UrlAccessSchema = new Schema(
  {
    url: {
      type: Schema.Types.ObjectId,
      ref: "Url"
    },
    accessAt: {
      type: Date,
      default: Date.now
    }
  }
);

const UrlAccess: Model<IUrlAccess> = model<IUrlAccess>("UrlAccess", UrlAccessSchema);
export default UrlAccess;