import express from 'express';
const routes = express.Router();

import routes_v1 from './v1/routes';

routes.use('/', routes_v1);

routes.get('*', (req, res) =>{
    res.status(404).send({data:'not found'});
})

export default routes;