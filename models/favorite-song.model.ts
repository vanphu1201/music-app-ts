import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema(
    {
        userId: String,
        singerId: String,
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const favoriteSong = mongoose.model("favoriteSong", favoriteSongSchema, "favorite-songs");

export default favoriteSong;