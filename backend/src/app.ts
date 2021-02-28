import express from 'express';
import boom from 'express-boom';
import cors from 'cors';
import { errors } from 'celebrate';
import morgan from 'morgan';

import config from '../src/config';
import routes from './routes';

const app = express();

if (config.NODE_ENV === 'development') {
  app.use(morgan("combined"));
}

app.use(express.json());
app.use(boom());

//{exposedHeaders:['Content-Length', 'Content-Type', 'X-Total-Count']}
app.use(cors());

app.use(routes);
app.use(errors());


export default app;
