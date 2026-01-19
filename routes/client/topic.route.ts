import express, { Request, Response, Router } from 'express';
const route: Router = express.Router();

import * as controller from '../../controllers/client/topic.controller';


route.get("/topics", controller.topics);

export const topicRoute: Router = route;
