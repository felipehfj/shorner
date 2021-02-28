import express from 'express';
import cors from 'cors';
import routesv1 from './v1/routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routesv1);


app.listen(process.env.PORT || 3333);