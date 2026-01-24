import express, { Router } from 'express';
const route: Router = express.Router();

import * as controller from '../../controllers/client/search.controller';


route.get("/:typeSearch", controller.typeSearch);


export const searchRoute: Router = route;
