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
        const votes = movie["vote_average"].toFixed(1);
        const posterPath = movie["poster_path"];

        // Creating a div for each movie and adding a class for styling
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-card")
        movieDiv.id = movie["id"];
          
        // Creating an img element for each movie poster
        const img = document.createElement("img");
        img.src = baseUrl + posterSize + '/' + posterPath;
        img.classList.add("movie-poster");

        // Creating votes div that contains star image and vote number
        const votesContainer = document.createElement("div");
        votesContainer.classList.add("votes-container");

        const starImg = document.createElement("img");
        starImg.src = "images/star.png";
        starImg.classList.add("star-image");

        const votesParagraph = document.createElement("p");
        votesParagraph.classList.add("movie-votes");
        votesParagraph.textContent = votes;

        votesContainer.appendChild(starImg);
        votesContainer.appendChild(votesParagraph);

        // Creating title name for movie
        const titleParagraph = document.createElement("p");
        titleParagraph.classList.add("movie-title")
        titleParagraph.textContent = title

        movieDiv.appendChild(img);
        movieDiv.appendChild(votesContainer);
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

moviesGrid.addEventListener("click", async (event) => {
    if (event.target.parentNode.classList.contains("movie-card")) {
        const movieCard = event.target.parentNode;
        const movieTitle = movieCard.querySelector(".movie-title").textContent;
        const movieVotes = movieCard.querySelector(".movie-votes").textContent;
        const movieID = movieCard.getAttribute("id");

        const results = await movieInfo(movieID);
        console.log(results);
        const runtime = results["runtime"];
        const releaseDate = results["release_date"];
        const genre = results["genres"][0]["name"];
        const overview = results["overview"];

        const popupWindow = document.createElement("div");
        popupWindow.className = "popup";
        popupWindow.id = "popup-window";
        popupWindow.innerHTML = `
            <div class="popup-close">
                <button class="close-btn" id="close-popup-btn">Close</button>
            </div>
            <div class="popup-content">
                <p class="popup-title">${movieTitle}</p>
                <p class="popup-info">${runtime} min | ${releaseDate} | ${genre} | <img class="star-image-popup" src="images/star.png"> ${movieVotes}</p>
                <p class="popup-desc">${overview}</p>
            </div>
        `;

        document.body.appendChild(popupWindow);
        document.body.style.overflow = "hidden";

        const closeBtn = document.getElementById("close-popup-btn");
        closeBtn.addEventListener("click", () => {
            document.body.removeChild(popupWindow);
            document.body.style.overflow = "auto";
        });
    }

});

async function movieInfo(movieID) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`
        const response = await fetch(url);
        const results = await response.json();
        
        return results;

    } catch (error) {
        console.log(error);
    }
}