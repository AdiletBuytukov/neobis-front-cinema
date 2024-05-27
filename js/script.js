const API_KEY = '8c8e1a50-6322-4135-8875-5d40a5420d86';
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR, 'items');

async function getMovies(url, key) {
    try {
        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            },
        });
        const respData = await resp.json();

        const data = respData[key] || respData.films || [];
        showMovies(data);
    } catch (error) {
    console.log(error);
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    document.querySelector('.movies').innerHTML = '';

    data.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML =
            `<div class="movie__cover-inner">
                    <img src = "${movie.posterUrlPreview}"
                        alt = "${movie.nameRu}"
                        class = "movie_cover" />
                    <div class="movie_cover--darkned"></div>
            </div>

            <div class="movie__info">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
                    <div class="movie__avarage moviea__average--green">${movie.ratingKinopoisk}</div>
            </div>`;
        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector("form");
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if (search.value) {
        getMovies(apiSearchUrl, 'films');
        search.value = '';
    }

})}