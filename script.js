var moviesGrid = document.getElementById("movies-grid");
var moviesBtn = document.getElementById("load-more-movies-btn");
var searchMovies = document.getElementById("search-movies")
var submitBtn = document.getElementById("submitBtn");
var searchInput = document.getElementById("search-input");

const apiKey = "43c1cf15af2eab2d2eb205ea044360be";
const baseUrl = "http://image.tmdb.org/t/p/";
const posterSize = "w300";

document.addEventListener('DOMContentLoaded', displayNowPlaying);
moviesBtn.addEventListener('click', displayNowPlaying);
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    displaySearchMovie();
});

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

    } catch (error) {
        console.log(error);
    }
}