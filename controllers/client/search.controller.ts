import { Request, Response } from "express"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { converToSlug } from "../../helpers/convertToSlug";


// [GET] /search/:typeSearch
export const typeSearch = async (req: Request, res: Response) => {

    const keyword: string = req.query.keyword.toString();

    let newSongs = [];

    if (keyword) {
        const regex = new RegExp(keyword, 'i');

        const slug = converToSlug(keyword);
        const regexSlug = new RegExp(slug, 'i');

        const songs = await Song.find({
            $or: [
                {title: regex},
                {slug: regexSlug}
            ]
        });

        for (const song of songs) {
            const inforSinger = await Singer.findOne({
                _id: song.singerId
            }).select("fullName");

            newSongs.push({
                id: song.id,
                title: song.title,
                avatar: song.avatar,
                like: song.like,
                slug: song.slug,
                nameSinger: inforSinger.fullName
            })
        }

    }

    switch (req.params.typeSearch.toString()) {
        case "result":
            res.render("client/pages/search/result.pug", {
                pageTitle: "Kết quả tìm kiếm",
                songs: newSongs,
                keyword: keyword
            })
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "thanh cong!",
                songs: newSongs
            })
            break;

        default:
            break;
    }


}
