import express, { Request, Response, Router } from 'express';
const route: Router = express.Router();

import Topic from '../../modules/topic.module';


route.get("/topics", async (req: Request, res: Response) => {
    const topics = await Topic.find({ deleted: false });
    res.render("client/pages/topics/index.pug", {
        
    });
})

export const topicRoute: Router = route;
