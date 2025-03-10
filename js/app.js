// 🎵 Playlist array containing song details: title, artist, file path, and album cover
const playlist = [
    { title: "I Need More Of You", artist: "Bellamy Brothers", src: "music/I Need More Of You.mp3", img: "img/iNeedMoreOfYou.png" },
    { title: "Baby Come Back", artist: "Player", src: "music/Baby Come Back.mp3", img: "img/babyComeBack.png" },
    { title: "A Man Without Love", artist: "Engelbert Humperdinck", src: "music/A Man Without Love.mp3", img: "img/aManWithoutLove.png" }
];

// 🎧 Get references to HTML elements for controlling the player
const playlistContainer = document.getElementById("playlist");
const audioPlayer = document.getElementById("audio");
const progressBar = document.getElementById("progress-bar");
const volumeControl = document.getElementById("volume");
const playPauseBtn = document.getElementById("playPauseBtn");
const albumCover = document.getElementById("album-cover");

let currentSong = 0; // Keeps track of the current song index

// 📀 Function to load and play a song
function loadSong(index) {
    let song = playlist[index]; // Get the song object from the playlist
    document.getElementById("song-title").innerText = song.title; // Update song title display
    document.getElementById("artist").innerText = song.artist; // Update artist name display
    audioPlayer.src = song.src; // Set the song source in the audio player
    albumCover.src = song.img; // Update the album cover image
    audioPlayer.play(); // Auto-play the loaded song
    updateActiveSong(); // Highlight the active song in the playlist
    playPauseBtn.innerText = "⏸ Pause"; // Update button text to Pause
}

// 📜 Function to generate the playlist UI dynamically
function updatePlaylist() {
    playlistContainer.innerHTML = ""; // Clear any existing playlist items
    playlist.forEach((song, index) => {
        let li = document.createElement("li"); // Create a new list item
        li.textContent = song.title; // Set song title as text
        li.addEventListener("click", () => { // Add click event to play the song
            currentSong = index;
            loadSong(currentSong);
        });
        li.dataset.index = index; // Assign an index to the list item
        playlistContainer.appendChild(li); // Append the item to the playlist container
    });
    updateActiveSong(); // Highlight the active song in the playlist
}

// ✅ Function to highlight the currently playing song in the playlist
function updateActiveSong() {
    document.querySelectorAll("#playlist li").forEach((li) => {
        li.classList.remove("active-song"); // Remove highlight from all songs
    });
    document.querySelector(`#playlist li:nth-child(${currentSong + 1})`).classList.add("active-song"); // Highlight current song
}

// ▶ Function to toggle play/pause
function playPause() {
    if (audioPlayer.paused) { // If the song is paused, play it
        audioPlayer.play();
        playPauseBtn.innerText = "⏸ Pause"; // Update button text
    } else { // If the song is playing, pause it
        audioPlayer.pause();
        playPauseBtn.innerText = "▶ Play"; // Update button text
    }
}

// 🔊 Function to adjust the volume
function setVolume() {
    audioPlayer.volume = volumeControl.value; // Set volume level based on slider value
}

// ⏩ Function to seek through the song using the progress bar
function seek(event) {
    let percent = event.offsetX / event.target.offsetWidth; // Calculate click position
    audioPlayer.currentTime = percent * audioPlayer.duration; // Update audio time
}

// ⏭ Function to play the next song in the playlist
function nextSong() {
    currentSong = (currentSong + 1) % playlist.length; // Move to the next song, loop back if at the end
    loadSong(currentSong);
}

// ⏮ Function to play the previous song
function prevSong() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length; // Move to the previous song, loop back if at the beginning
    loadSong(currentSong);
}

// 🔁 Automatically play the next song when the current one ends
audioPlayer.addEventListener("ended", nextSong);

// 📊 Update the progress bar as the song plays
audioPlayer.ontimeupdate = () => {
    let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100; // Calculate progress percentage
    progressBar.style.width = progress + "%"; // Update progress bar width
};

// 🎼 Initialize the playlist when the page loads
updatePlaylist();
loadSong(currentSong);
