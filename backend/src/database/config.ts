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

  console.log(process.env.NODE_ENV, process.env.MONGO_URI);
  return db;
}

export default getByEnv();