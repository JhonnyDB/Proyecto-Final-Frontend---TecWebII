var audio = document.getElementById("myAudio");
window.addEventListener("beforeunload", function() {
    localStorage.setItem("audioTime", audio.currentTime);
    audio.pause();
});

window.addEventListener("load", function() {
    var audioTime = localStorage.getItem("audioTime");
    if (audioTime !== null) {
    audio.currentTime = audioTime;
}
    audio.play();
});