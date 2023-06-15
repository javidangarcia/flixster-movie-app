var movies = document.getElementById("movies-grid");
var moviesBtn = document.getElementById("load-more-movies-btn");

const apiKey = "43c1cf15af2eab2d2eb205ea044360be";

// movie poster image link information
const base_url = "http://image.tmdb.org/t/p/";
const poster_size = "w300";

var currentPage = 1;

document.addEventListener('DOMContentLoaded', fetchData);
moviesBtn.addEventListener('click', fetchData);

async function fetchData() {
    try {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`;
        const response = await fetch(url);
        const data = await response.json();
        const results = data["results"];
        
        results.forEach((movie) => {

          const title = movie["title"];
          const votes = movie["vote_average"];
          const poster_path = movie["poster_path"];

          // Creating a div for each movie and adding a class for styling
          const movieDiv = document.createElement("div");
          movieDiv.classList.add("movie-card")
            
          // Creating an img element for each movie poster
          const img = document.createElement("img");
          img.src = base_url + poster_size + '/' + poster_path;
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

          movies.appendChild(movieDiv);

        
        });

        currentPage += 1;

    } catch (error) {
        console.log(error);
    }
};
