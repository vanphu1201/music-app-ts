import express, { Router } from 'express';
const route: Router = express.Router();

import * as controller from '../../controllers/client/song.controller';


route.get("/:slugTopic", controller.list);

route.get("/detail/:slugSong", controller.detail);

route.patch("/like/:typeLike/:songId", controller.like);

route.patch("/favorite/:typeFavorite/:songId", controller.favorite);

export const songRoute: Router = route;
