import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";


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