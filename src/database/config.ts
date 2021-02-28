import { ConnectionOptions } from "mongoose";

function getByEnv() {
  const connectionOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }

  const db = {
    uri: process.env.MONGO_URI || '',
    options: connectionOptions
  };
  return db;
}

export default getByEnv();