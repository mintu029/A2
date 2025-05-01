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
// Chuyển giây thành định dạng mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Cập nhật thời lượng video khi sẵn sàng
video.addEventListener("loadedmetadata", () => {
  seekBar.max = video.duration;
  durationEl.textContent = formatTime(video.duration);
});

// Cập nhật thanh seekBar và thời gian hiện tại khi video đang phát
video.addEventListener("timeupdate", () => {
  seekBar.value = video.currentTime;
  currentTimeEl.textContent = formatTime(video.currentTime);
});

// Khi kéo seekBar thì cập nhật thời gian video
seekBar.addEventListener("input", () => {
  video.currentTime = seekBar.value;
});
video.addEventListener("timeupdate", updateProgressBar);
// Add other functionalities here

function increaseVolume() {
  // Increase volume by 0.1
  video.volume = Math.min(video.volume + 0.1, 1.0);
}
function decreaseVolume() {
  // Decrease volume by 0.1
  video.volume = Math.max(video.volume - 0.1, 0.0);
}

// Add event listeners to the volume buttons
growVolumeBtn.addEventListener("click", increaseVolume);
lowVolumeBtn.addEventListener("click", decreaseVolume);

function toggleForwardVideo(seconds) {
  video.currentTime += seconds;
  // Ensure time doesn't exceed video duration
  if (video.currentTime > video.duration) {
    video.currentTime = video.duration;
  }
}
