var movies = document.getElementById("movies");

const apiKey = "43c1cf15af2eab2d2eb205ea044360be";
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`

document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data["results"];
        const movie = results[0];
        const title = movie["title"];
        movies.innerHTML = '';

        results.forEach((movie) => {
          const title = movie.title;
          console.log(title);
          movies.innerHTML += '<p>' + title + '</p>';
        });
        console.log(title);

    } catch (error) {
        console.log(error);
    }
};

