

import addMoviePage from "./pages/add-movie.js";

import homePage from "./pages/home.js";
import loginPage from "./pages/login.js";
// import loginPage from "./views/login.js";
import movieDetailsPage from "./pages/movie-details.js";
// import movieDetailsPage from "./views/movieDetails.js";
import registerPage from "./pages/register.js";
import viewFinder from "./viewFinder.js";

setup();

async function setup() {
    loginPage.initiliaze(document.getElementById('form-login'));
    registerPage.initiliaze(document.getElementById('form-sign-up'));
    homePage.initiliaze(document.getElementById('home-page'));
    addMoviePage.initiliaze(document.getElementById('add-movie'));
    movieDetailsPage.initiliaze(document.getElementById('movie-details'));
    // edi.initiliaze(document.getElementById('edit-movie'));
    console.log('here');
    viewFinder.initiliaze(document.querySelectorAll('.link'));

    viewFinder.navigateTo('home');
}
