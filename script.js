const moviesGrid = document.getElementById("movies-grid");
const moviesBtn = document.getElementById("load-more-movies-btn");
const submitBtn = document.getElementById("submit-btn");
const searchInput = document.getElementById("search-input");
const closeSearchBtn = document.getElementById("close-search-btn")
const nowPlaying = document.getElementById("now-playing")


const apiKey = "43c1cf15af2eab2d2eb205ea044360be";
const baseUrl = "http://image.tmdb.org/t/p/";
const posterSize = "w1280";

document.addEventListener("DOMContentLoaded", displayNowPlaying);
moviesBtn.addEventListener("click", displayNowPlaying);
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    displaySearchMovie();
});
closeSearchBtn.addEventListener("click", closeSearch);


function displayMovies(results) {

    results.forEach((movie) => {

        const title = movie["title"];
        const votes = movie["vote_average"];
        const posterPath = movie["poster_path"];

        // Creating a div for each movie and adding a class for styling
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-card")
          
        // Creating an img element for each movie poster
        const img = document.createElement("img");
        img.src = baseUrl + posterSize + '/' + posterPath;
        img.classList.add("movie-poster");
      
        // Creating p tags that contain votes and title information
        const votesParagraph = document.createElement("p");
        votesParagraph.classList.add("movie-votes")
        votesParagraph.textContent = votes;
        const titleParagraph = document.createElement("p");
        titleParagraph.classList.add("movie-title")
        titleParagraph.textContent = title

        movieDiv.appendChild(img);
        movieDiv.appendChild(votesParagraph);
        movieDiv.appendChild(titleParagraph);

        moviesGrid.appendChild(movieDiv);

    });
        
}

var currentPage = 1;

async function displayNowPlaying() {
    try {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`;
        const response = await fetch(url);
        const data = await response.json();
        const results = data["results"];
        
        displayMovies(results);
        closeSearchBtn.className = "hidden";

        currentPage += 1;

    } catch (error) {
        console.log(error);
    }
};

async function displaySearchMovie() {
    try {
        // resets moviesGrid div
        while (moviesGrid.firstChild) {
            moviesGrid.removeChild(moviesGrid.firstChild);
        }

        const searchQuery = searchInput.value;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
        const response = await fetch(url);
        const data = await response.json();
        const results = data["results"];
        
        displayMovies(results);
        closeSearchBtn.className = "close-btn";
        moviesBtn.className = "hidden";
        nowPlaying.className = "hidden";

    } catch (error) {
        console.log(error);
    }
}

function closeSearch() {
    while (moviesGrid.firstChild) {
        moviesGrid.removeChild(moviesGrid.firstChild);
    }

    displayNowPlaying();
}

// Movie Popup Feature

moviesGrid.addEventListener("click", (event) => {
    if (event.target.parentNode.classList.contains("movie-card")) {
        const movieCard = event.target.parentNode;
        const movieTitle = movieCard.querySelector(".movie-title").textContent;

        const popupWindow = document.createElement("div");
        popupWindow.className = "popup";
        popupWindow.id = "popup-window";

        const popupClose = document.createElement("div");
        popupClose.className = "popup-close";

        const closeBtn = document.createElement("button")
        closeBtn.className = "close-btn"
        closeBtn.id = "close-popup-btn";
        closeBtn.textContent = "Close";

        popupClose.appendChild(closeBtn);
        popupWindow.appendChild(popupClose);

        const popupContent = document.createElement("div");
        popupContent.className = "popup-content";

        const popupText = document.createElement("p")
        popupText.className = "popup-text";
        popupText.textContent = movieTitle;

        popupContent.appendChild(popupText);
        popupWindow.appendChild(popupContent);

        document.body.appendChild(popupWindow);

        closeBtn.addEventListener("click", closePopup);
    }

});

function closePopup() {
    const popupWindow = document.getElementById("popup-window");
    document.body.removeChild(popupWindow);
}