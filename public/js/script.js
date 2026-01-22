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