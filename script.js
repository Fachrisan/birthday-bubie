const intro = document.querySelector("#intro");
const content = document.querySelector("#content");
const openButtons = [document.querySelector("#openLetter"), document.querySelector("#openLetterText")];
const heartsLayer = document.querySelector(".falling-hearts");
const loveButton = document.querySelector("#loveButton");
const loveReply = document.querySelector("#loveReply");
const birthdaySong = document.querySelector("#birthdaySong");
const musicButton = document.querySelector("#musicButton");
const greetingVideo = document.querySelector("#video-ucapan video");

function updateMusicButton() {
  musicButton.textContent = birthdaySong.paused ? "♪" : "Ⅱ";
  musicButton.classList.toggle("is-paused", birthdaySong.paused);
  musicButton.setAttribute("aria-label", birthdaySong.paused ? "Putar lagu" : "Jeda lagu");
}

function playBirthdaySong() {
  birthdaySong.volume = 0.55;
  birthdaySong.play().catch(() => {
    updateMusicButton();
  });
}

function openLetter() {
  intro.classList.add("opening");
  playBirthdaySong();

  window.setTimeout(() => {
    intro.classList.add("hidden");
    content.scrollIntoView({ behavior: "smooth" });
  }, 950);
}

openButtons.forEach((button) => {
  button.addEventListener("click", openLetter);
});

musicButton.addEventListener("click", () => {
  if (birthdaySong.paused) {
    playBirthdaySong();
    return;
  }

  birthdaySong.pause();
});

birthdaySong.addEventListener("play", updateMusicButton);
birthdaySong.addEventListener("pause", updateMusicButton);
updateMusicButton();

if (greetingVideo) {
  greetingVideo.muted = false;
  greetingVideo.volume = 1;

  greetingVideo.addEventListener("play", () => {
    birthdaySong.pause();
    greetingVideo.muted = false;
    greetingVideo.volume = 1;
  });
}

function createFallingHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.32 ? "♡" : "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.setProperty("--drift", `${Math.random() * 140 - 70}px`);
  heart.style.animationDuration = `${8 + Math.random() * 8}s`;
  heart.style.fontSize = `${14 + Math.random() * 18}px`;
  heartsLayer.appendChild(heart);

  heart.addEventListener("animationend", () => heart.remove());
}

window.setInterval(createFallingHeart, 650);

function showLoveBurst() {
  loveReply.classList.add("show");

  for (let i = 0; i < 34; i += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = i % 3 === 0 ? "♡" : "♥";
    heart.style.setProperty("--x", `${Math.random() * 520 - 260}px`);
    heart.style.setProperty("--y", `${Math.random() * -420 - 80}px`);
    heart.style.setProperty("--size", `${18 + Math.random() * 26}px`);
    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

loveButton.addEventListener("click", showLoveBurst);
