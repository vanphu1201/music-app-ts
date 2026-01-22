import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import favoriteSong from "../../models/favorite-song.model";


// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {

    const topic = await Topic.findOne({
        slug: req.params.slugTopic,
        deleted: false,
        status: "active"
    })

    const songs = await Song.find({
        topicId: topic.id,
        deleted: false,
        status: "active"
    }).select(" avatar title slug singerId like");

    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        });

        song["infoSinger"] = infoSinger;
    }

    res.render("client/pages/songs/list", {
        pageTitle: topic.title,
        songs: songs
    });
}

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
    const slugSong: string = req.params.slugSong.toString();
    try {
        const song = await Song.findOne({
            deleted: false,
            status: "active",
            slug: slugSong
        });

        const singer = await Singer.findOne({
            deleted: false,
            status: "active",
            _id: song.singerId
        }).select("fullName");

        const topic = await Topic.findOne({
            deleted: false,
            status: "active",
            _id: song.topicId
        }).select("title");

        console.log(song)

        res.render("client/pages/songs/detail", {
            pageTitle: "Chi tiết bài hát",
            song: song,
            topic: topic,
            singer: singer
        });
    } catch (error) {
        res.redirect("/");
    }
}

// [PATCH] /songs/like/:typeLike/:songid
export const like = async (req: Request, res: Response) => {
    const songId: string = req.params.songId.toString();
    const typeLike: string = req.params.typeLike.toString();
    const song = await Song.findOne({
        deleted: false,
        status: "active",
        _id: songId
    })
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    await Song.updateOne(
    {
        deleted: false,
        status: "active",
        _id: songId
    }, {
        like: newLike
    });

    res.json({
        code: 200,
        message: "Like thanh cong!",
        like: newLike
    });
}

// [PATCH] /songs/favorite/:typeFavorite/:songid
export const favorite = async (req: Request, res: Response) => {
    const songId: string = req.params.songId.toString();
    const typeFavorite: string = req.params.typeFavorite.toString();

    console.log(typeFavorite)

    if (typeFavorite == "disFavorite") {
        await favoriteSong.deleteOne({songId: songId});
    } else {
        const newFavoriteSong = new favoriteSong({
            songId: songId,
            // userId = userId
        });
        await newFavoriteSong.save();
    }

    res.json({
        code: 200,
        message: "Thanh cong!",
        typeFavorite: typeFavorite
    });
}