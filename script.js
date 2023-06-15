var movies = document.getElementById("movies");

const apiKey = "43c1cf15af2eab2d2eb205ea044360be";
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`

// movie poster image link information
const base_url = "http://image.tmdb.org/t/p/";
const poster_size = "w300";

document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data["results"];
        
        results.forEach((movie) => {

          const title = movie["title"];
          const rating = movie["vote_average"];
          const poster_path = movie["poster_path"];

          // Creating a div for each movie
          const movieDiv = document.createElement("div");
            
          // Creating an img element for each movie poster
          const img = document.createElement("img");
          img.src = base_url + poster_size + '/' + poster_path;
        
          // Creating p tags that contain rating and title information
          const ratingParagraph = document.createElement("p");
          ratingParagraph.textContent = rating;
          const titleParagraph = document.createElement("p");
          titleParagraph.textContent = title

          movieDiv.appendChild(img);
          movieDiv.appendChild(ratingParagraph);
          movieDiv.appendChild(titleParagraph);

          movies.appendChild(movieDiv);
        });

    } catch (error) {
        console.log(error);
    }
};

