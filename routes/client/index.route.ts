import { Express } from 'express';
import { topicRoute } from './topic.route';

const ClientRoute = (app: Express) => {
    
    app.use("/", topicRoute);
    
}

export default ClientRoute;