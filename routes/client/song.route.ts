import express, { Router } from 'express';
const route: Router = express.Router();

import * as controller from '../../controllers/client/song.controller';


route.get("/:slugTopic", controller.list);

route.get("/detail/:slugSong", controller.detail);


export const songRoute: Router = route;
