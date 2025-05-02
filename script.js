const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar");
const seekBar = document.querySelector(".seek-bar");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".music-time");
const growVolumeBtn = document.querySelector("#grow-volume");
const lowVolumeBtn = document.querySelector("#low-volume");
video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}
// Convert seconds to mm:ss format so the machine can understand and process the time data I want.
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Update video duration when ready. With this command the algorithm will help the computer understand and update the time according to my intention
video.addEventListener("loadedmetadata", () => {
  seekBar.max = video.duration;
  durationEl.textContent = formatTime(video.duration);
});

// Updating the seekBar and the current time as the video plays, helps us know how long the video is. And it seems that when I create the seekBar and the time outside the video, it makes it easier to see. And gives my site some personality. This is the part I think I spent the most time on, because I was stuck trying to figure out how to solve the problem.
video.addEventListener("timeupdate", () => {
  seekBar.value = video.currentTime;
  currentTimeEl.textContent = formatTime(video.currentTime);
});

// When dragging the seekBar, the video time is updated. I think this part also caused me a lot of trouble. Because I mixed up the names in the algorithm. But when I fixed it successfully, the result was really worth it.
seekBar.addEventListener("input", () => {
  video.currentTime = seekBar.value;
});
video.addEventListener("timeupdate", updateProgressBar);

function increaseVolume() {
  // Increase volume by 0.1
  video.volume = Math.min(video.volume + 0.1, 1.0);
}
function decreaseVolume() {
  // Decrease volume by 0.1
  video.volume = Math.max(video.volume - 0.1, 0.0);
}

// Add event listeners to the volume buttons, to everyone can interact with these button
growVolumeBtn.addEventListener("click", increaseVolume);
lowVolumeBtn.addEventListener("click", decreaseVolume);

function toggleForwardVideo(seconds) {
  video.currentTime += seconds;
  // Ensure time doesn't exceed video duration
  if (video.currentTime > video.duration) {
    video.currentTime = video.duration;
  }
}
