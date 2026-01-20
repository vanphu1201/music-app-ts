import { Express } from 'express';
import { topicRoute } from './topic.route';
import { songRoute } from './song.route';

const ClientRoute = (app: Express) => {
    
    app.use("/", topicRoute);

    app.use("/songs", songRoute);
    
}

export default ClientRoute;