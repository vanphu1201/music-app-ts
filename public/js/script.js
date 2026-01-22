// APlayer
const audio = document.querySelector("#aplayer");
let singer = audio.getAttribute("data-singer");
singer = JSON.parse(singer).fullName;
let song = audio.getAttribute("data-song");
song = JSON.parse(song);

console.log(singer)
console.log(song.title)

const ap = new APlayer({
    container: document.getElementById('aplayer'),
    autoplay: true,
    audio: [{
        name: song.title,
        artist: singer,
        url: song.audio,
        cover: song.avatar
    }]
});

const avatar = document.querySelector(".inner-avatar");
if (avatar) {
    ap.on("play", () => {
        avatar.classList.add("playing");
    });

    ap.on("pause", () => {
        avatar.classList.remove("playing")
    })
}
// End APlayer

// button Like
const buttonLike = document.querySelector(".inner-action.inner-like");
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        buttonLike.classList.toggle("like");
        const isLike = buttonLike.classList.contains("like");
        const typeLike = isLike ? "like" : "dislike";
        const songId = buttonLike.getAttribute("song-id");
        const option = {
            method: "PATCH"
        }
        fetch(`/songs/like/${typeLike}/${songId}`, option)
            .then(res => res.json())
            .then(data => {
                buttonLike.querySelector("span").innerHTML = `${data.like}`;
            })

    });

}
// End button Like

// button favorite
const buttonFavorite = document.querySelector(".inner-action.inner-heart");
if (buttonFavorite) {
    buttonFavorite.addEventListener("click", () => {
        buttonFavorite.classList.toggle("favorite");
        const isFavorite = buttonFavorite.classList.contains("favorite");
        const typefavorite = isFavorite ? "favorite" : "disFavorite";
        const songId = buttonLike.getAttribute("song-id");
        const option = {
            method: "PATCH"
        }
        fetch(`/songs/favorite/${typefavorite}/${songId}`, option)
            .then(res => res.json())
            .then(data => {
            })

    });

}
// End button favorite
