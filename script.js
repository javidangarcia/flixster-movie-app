var movies = document.getElementById("movies");

const apiKey = "43c1cf15af2eab2d2eb205ea044360be";
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`

// poster stuff
const base_url = "http://image.tmdb.org/t/p/";
const poster_size = "w300";

document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data["results"];
        
        movies.innerHTML = '';
        results.forEach((movie) => {
          const title = movie["title"];
          const rating = movie["vote_average"];
          const poster_path = movie["poster_path"];

          const img = document.createElement("img");
          img.src = base_url + poster_size + '/' + poster_path;
          movies.appendChild(img);
          movies.innerHTML += '<p>' + rating + '</p>';
          movies.innerHTML += '<p>' + title + '</p>';
        });
        console.log(title);

    } catch (error) {
        console.log(error);
    }
};

