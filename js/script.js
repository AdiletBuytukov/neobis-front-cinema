const API_KEY = '8c8e1a50-6322-4135-8875-5d40a5420d86';
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_PREMIERES = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY";
const API_URL_CLOSES_RELEASES = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1";
const API_URL_TOP_MOVIES = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const API_URL_MONTH_RELEASES = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=JANUARY&page=1";

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
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    document.querySelector('.movies').innerHTML = '';

    data.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML =
            `<div class="movie__cover-inner">
                    <img src="${movie.posterUrlPreview}"
                        alt="${movie.nameRu}"
                        class="movie_cover" />
                    <div class="movie_cover--darkned"></div>
            </div>

            <div class="movie__info">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`).join(', ')}</div>
                    <div class="movie__avarage movie__average--green">${movie.ratingKinopoisk}</div>
                    <button class="favorite_icon_btn" data-movie='${JSON.stringify(movie)}'></button>
            </div>`;
        moviesEl.appendChild(movieEl);
    });

    document.querySelectorAll('.favorite_icon_btn').forEach(button => {
        button.addEventListener('click', () => {
            const movie = JSON.parse(button.getAttribute('data-movie'));
            addFavoriteMovie(movie);
        });
    });
}

function addFavoriteMovie(movie) {
    const favorites = getFavoriteMovies();
    if (!favorites.some(fav => fav.filmId === movie.filmId)) {
        favorites.push(movie);
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    }
}

function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}

function showFavoriteMovies() {
    const favorites = getFavoriteMovies();
    showMovies(favorites);
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
})

const premieres = document.querySelector('.premieres');

premieres.addEventListener('click', () => {
    getMovies(API_URL_PREMIERES, 'items');
})

const releases = document.querySelector('.releases');

releases.addEventListener('click', () => {
    getMovies(API_URL_CLOSES_RELEASES, 'items')
})

const popular_movie = document.querySelector('.popular_movie');

popular_movie.addEventListener('click', () => {
    getMovies(API_URL_TOP_MOVIES, 'items')
})

const releases_month = document.querySelector('.releases_month');

releases_month.addEventListener('click', () => {
    getMovies(API_URL_MONTH_RELEASES, 'releases')
});

const favorite = document.querySelector('.favorite_movies');

favorite.addEventListener('click', () => {
    showFavoriteMovies();
});