console.log("this is a spotify player of Aashiqui 2 album");

const songs = [
  { title: "Tum Hi Ho", artist: "Arijit Singh", file: "./Aashiqui 2 (2013)/1.mp3" },
  { title: "Sunn Raha Hai", artist: "Ankit Tiwari", file: "./Aashiqui 2 (2013)/2.mp3" },
  { title: "Chahun Main Ya Naa", artist: "Arijit Singh, Palak Muchhal", file: "./Aashiqui 2 (2013)/3.mp3" },
  { title: "Hum Mar Jayenge", artist: "Arijit Singh, Tulsi Kumar", file: "./Aashiqui 2 (2013)/4.mp3" },
  { title: "Meri Aashiqui", artist: "Arijit Singh, Palak Muchhal", file: "./Aashiqui 2 (2013)/5.mp3" },
  { title: "Piya Aaye Na", artist: "K.K., Tulsi Kumar", file: "./Aashiqui 2 (2013)/6.mp3" },
  { title: "Bhula Dena", artist: "Mustafa Zahid", file: "./Aashiqui 2 (2013)/7.mp3" },
  { title: "Aasan Nahin Yahan", artist: "Arijit Singh", file: "./Aashiqui 2 (2013)/8.mp3" },
  { title: "Sun Raha Hai-Female", artist: "Shreya Ghoshal", file: "./Aashiqui 2 (2013)/9.mp3" },
  { title: "Milne Hai Mujhse Aayi", artist: "Arijit Singh", file: "./Aashiqui 2 (2013)/10.mp3" },
  { title: "Aashiqui-The Love Theme", artist: "Instrumental", file: "./Aashiqui 2 (2013)/11.mp3" },
];

let individualRows = document.querySelectorAll(".individual_rows");
let mainProgressbar = document.querySelector("#main-progressbar");
let volumeProgressbar = document.querySelector("#volume-slider");
let currentlyPlayingAudio = null;
let bottom_playbutton = document.querySelector(".bottom_playbutton");
let endTimeElement = document.querySelector(".end-time");
let songCover = document.querySelector(".song_cover");
let nextSong = document.querySelector(".nextSong");
let previousSong = document.querySelector(".previousSong");

let currentIndex = -1; // Track the index of the currently playing song

// Format time helper function
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  return `${minutes}:${remainingSeconds}`;
}

function playSong(index) {
  if (index < 0 || index >= songs.length) return;

  // Pause and reset the currently playing audio if exists
  if (currentlyPlayingAudio) {
    currentlyPlayingAudio.pause();
    currentlyPlayingAudio.currentTime = 0;
  }

  // Update the currentIndex
  currentIndex = index;

  // Create a new audio element for the selected song
  currentlyPlayingAudio = new Audio(songs[index].file);

  // Update the bottom player UI with the new song's details
  let songnameBottomplayer = document.querySelector(".songname_bottomplayer");
  let artistnameBottomplayer = document.querySelector(".artistname_bottomplayer");

  songnameBottomplayer.textContent = songs[index].title;
  artistnameBottomplayer.textContent = songs[index].artist;

  // Play the new audio element
  currentlyPlayingAudio.play();

  // Update the end time once metadata is loaded
  currentlyPlayingAudio.addEventListener("loadedmetadata", function () {
    endTimeElement.textContent = formatTime(currentlyPlayingAudio.duration);
  });

  // Update the progress bar as the song plays
  currentlyPlayingAudio.addEventListener("timeupdate", function () {
    let value =
      (currentlyPlayingAudio.currentTime / currentlyPlayingAudio.duration) *
      100;
    mainProgressbar.value = value;
    mainProgressbar.style.background = `linear-gradient(to right, white ${value}%, #4d4c4d ${value}%)`;
  });

  // Update the bottom play button icon to pause
  bottom_playbutton.innerHTML = `<img class="bottom-pausebutton" src="./images/pause.png">`;

  // Optional: Update song cover or other UI elements
  songCover.style.opacity = "1";
}

// Event listener for the next song button
nextSong.addEventListener("click", () => {
  let nextIndex = (currentIndex + 1) % songs.length;
  playSong(nextIndex);
});

// Event listener for the previous song button
previousSong.addEventListener("click", () => {
  let prevIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(prevIndex);
});

// eachRow hover effect------------------------------------------------------------------------------------

individualRows.forEach((eachRow, index) => {
  let serialNo = eachRow.querySelector(".cell-content");
  let bottom_playbutton = document.querySelector(".bottom_playbutton");

  // Update song name and artist's name
  let songnameBottomplayer = document.querySelector(".songname_bottomplayer");
  let artistnameBottomplayer = document.querySelector(".artistname_bottomplayer");

  let songname = eachRow.querySelector(".song_name").textContent;
  let artistname = eachRow.querySelector(".artist-name").textContent;

  eachRow.addEventListener("mouseover", function () {
    serialNo.innerHTML = `<img class="listplaypng" id="${index + 1}" src="./images/listplay.png">`;

    let playImage = serialNo.querySelector(".listplaypng");

    playImage.addEventListener("click", function () {
      if (currentlyPlayingAudio && currentlyPlayingAudio !== new Audio(songs[index].file)) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
      }

      if (!currentlyPlayingAudio || currentlyPlayingAudio.src !== songs[index].file) {
        currentlyPlayingAudio = new Audio(songs[index].file);
        currentIndex = index; // Update currentIndex
      }

      if (currentlyPlayingAudio.paused || currentlyPlayingAudio.currentTime <= 0) {
        currentlyPlayingAudio.play();
        bottom_playbutton.innerHTML = `<img class="bottom-pausebutton" src="./images/pause.png">`;

        songnameBottomplayer.textContent = songname;
        artistnameBottomplayer.textContent = artistname;

        // Update the end-time
        currentlyPlayingAudio.addEventListener("loadedmetadata", function () {
          endTimeElement.textContent = formatTime(currentlyPlayingAudio.duration);
        });

        songCover.style.opacity = "1";

      } else {
        currentlyPlayingAudio.pause();
        bottom_playbutton.innerHTML = `<img class="bottom-playbutton" src="./images/play.png">`;
      }

      currentlyPlayingAudio.addEventListener("timeupdate", function () {
        if (!mainProgressbar.classList.contains("hovering")) {
          let value = (currentlyPlayingAudio.currentTime / currentlyPlayingAudio.duration) * 100;
          mainProgressbar.value = value;
          mainProgressbar.style.background = `linear-gradient(to right, white ${value}%, #4d4c4d ${value}%)`;
        }
      });
    });
  });

  bottom_playbutton.addEventListener('click', function() {
    if(currentlyPlayingAudio) {
      if(currentlyPlayingAudio.paused) {
        currentlyPlayingAudio.play();
        bottom_playbutton.innerHTML = `<img class="bottom-pausebutton" src="./images/pause.png">`;
      } else {
        currentlyPlayingAudio.pause();
        bottom_playbutton.innerHTML = `<img class="bottom-playbutton" src="./images/play.png">`;
      }
    }
  });

  eachRow.addEventListener("mouseout", function (e) {
    if (!eachRow.contains(e.relatedTarget)) {
      serialNo.textContent = index + 1;
    }
  });

  serialNo.addEventListener("mouseover", function (e) {
    e.stopPropagation();
  });
});

// ProgressBars ----------------------------------------------------------------------------

mainProgressbar.addEventListener("mouseover", function () {
  mainProgressbar.classList.add("hovering");
  let value =
    (currentlyPlayingAudio.currentTime / currentlyPlayingAudio.duration) * 100;
  mainProgressbar.classList.add("custom-thumb");
  mainProgressbar.style.background = `linear-gradient(to right, #00ff4e ${value}% , #4d4c4d ${value}%)`;
});

mainProgressbar.addEventListener("mouseout", function () {
  mainProgressbar.classList.remove("hovering");
  let value =
    (currentlyPlayingAudio.currentTime / currentlyPlayingAudio.duration) * 100;
  mainProgressbar.classList.remove("custom-thumb");
  mainProgressbar.style.background = `linear-gradient(to right, white ${value}% , #4d4c4d ${value}%)`;
});

mainProgressbar.addEventListener("change", function () {
  currentlyPlayingAudio.currentTime =
    (mainProgressbar.value * currentlyPlayingAudio.duration) / 100;
});

volumeProgressbar.addEventListener("input", function () {
  volumeProgressbar.classList.add("custom-thumb");
  value =
    ((volumeProgressbar.value - volumeProgressbar.min) /
      (volumeProgressbar.max - volumeProgressbar.min)) *
    100;
  volumeProgressbar.style.background = `linear-gradient(to right, #00ff4e ${value}% ,#4d4c4d ${value}%)`;
});

volumeProgressbar.addEventListener("mouseover", function () {
  volumeProgressbar.classList.add("custom-thumb");
  value =
    ((volumeProgressbar.value - volumeProgressbar.min) /
      (volumeProgressbar.max - volumeProgressbar.min)) *
    100;
  volumeProgressbar.style.background = `linear-gradient(to right, #00ff4e ${value}% ,#4d4c4d ${value}%)`;
});

volumeProgressbar.addEventListener("mouseout", function () {
  volumeProgressbar.classList.remove("custom-thumb");
  volumeProgressbar.style.background = `linear-gradient(to right, white ${value}% , #4d4c4d ${value}%)`;
});

function volumeBarInitial() {
  value =
    ((volumeProgressbar.value - volumeProgressbar.min) /
      (volumeProgressbar.max - volumeProgressbar.min)) *
    100;
  volumeProgressbar.style.background = `linear-gradient(to right, white ${value}% , #4d4c4d ${value}%)`;
}

volumeBarInitial();

