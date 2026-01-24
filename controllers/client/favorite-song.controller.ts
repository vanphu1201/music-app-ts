import { Request, Response } from "express-serve-static-core"
import favoriteSong from "../../models/favorite-song.model"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

export const list = async (req: Request, res: Response) => {
    const favoriteSongs = await favoriteSong.find({deleted: false});
    let songs = [];
    for (const favoriteSong of favoriteSongs) {
        const song = await Song.findOne({
            _id: favoriteSong.songId,
            deleted: false,
            status: "active"
        })
        const inforSinger = await Singer.findOne({
            deleted: false,
            status: "active",
            _id: song.singerId
        }).select("fullName");
        song["infoSinger"] = inforSinger;
        songs.push(song);
    }

    console.log(songs)
    res.render("client/pages/favorite-songs/list.pug", {
        pageTitle: "Bài hát yêu thích",
        songs: songs
    })
}