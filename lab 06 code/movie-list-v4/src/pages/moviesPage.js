import moviesService from '../services/moviesService.js';
import movieTemplate from '../templates/movieTemplate.js';
import render from '../render.js';
import movieView from '../views/movieView.js';

let moviesSection = document.querySelector('.movies');

function showPage() {
    moviesSection.classList.remove('hidden');
    moviesService.getAllMovies()
        .then(renderMovies);
}

function hidePage() {
    moviesSection.classList.add('hidden');
}

function renderMovies(movies) {
    let movieListElement = document.querySelector('.movie-list');
    // let movieTemplate = moviesSection.querySelector('#movie-card-template');

    movieListElement.innerHTML = '';
    
    for (const movie of movies) {
        movie.isDisabled = Math.random() < 0.5;
        // let currentMovieElement = renderMovie(movieTemplate, movie);
        // movieListElement.appendChild(currentMovieElement);

        // movieListElement.innerHTML += movieTemplate(movie); // used by templates/movieTemplate

        movieListElement.innerHTML += render(movieView, movie);
    }

    moviesSection.appendChild(movieListElement)
}

// DOM Manipulation template style
// function renderMovie(movieTemplate, movie) {
//     let currentMovieElement = movieTemplate.cloneNode(true);
//     currentMovieElement.classList.remove('hidden');
//     currentMovieElement.removeAttribute('id');

//     let titleElement = currentMovieElement.querySelector('.card-title');
//     titleElement.textContent = movie.title;

//     let descriptionElement = currentMovieElement.querySelector('.card-text');
//     descriptionElement.textContent = movie.description;

//     return currentMovieElement;
// }

export default {
    showPage,
    hidePage,
}