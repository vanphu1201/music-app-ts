import express, { Router } from 'express';
const route: Router = express.Router();

import * as controller from '../../controllers/client/favorite-song.controller';


route.get("/", controller.list);


export const favoriteSongRoute: Router = route;
