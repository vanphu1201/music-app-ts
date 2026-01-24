import { Express } from 'express';
import { topicRoute } from './topic.route';
import { songRoute } from './song.route';
import { favoriteSongRoute } from './favorite-songs.route';
import { searchRoute } from './search.route';

const ClientRoute = (app: Express) => {
    
    app.use("/", topicRoute);

    app.use("/songs", songRoute);

    app.use("/favorite-songs", favoriteSongRoute);

    app.use("/search", searchRoute);
    
}

export default ClientRoute;