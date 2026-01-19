import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import * as database from './config/database';
import ClientRoute from './routes/client/index.route';

const app: Express = express();
const port: number | string = process.env.PORT;

ClientRoute(app)

database.connect();

app.set('views', './views');
app.set('view engine', 'pug')


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})