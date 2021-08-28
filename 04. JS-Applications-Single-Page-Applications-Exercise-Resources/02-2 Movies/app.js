import addMovie from "./pages/addMovie.js";
import home from "./pages/home.js";
import nav from "./pages/nav.js";
import editMovie from "./pages/editMovie.js";
import formLogIn from "./pages/formLogIn.js";
import formRegister from "./pages/formRegister.js";
import movieDetails from "./pages/movieDetails.js";
import viewSelector from "./viewSelector.js";
import auth from "./services/auth.js";

export const allMenuItemsSelector = ".menu-item";
let root = undefined;

(() => {
    let rootSelector = "#app";
    root = document.querySelector(rootSelector);
    auth.clearStorage();


    editMovie.startPoint(document.querySelector("#edit-movie"));
    addMovie.startPoint(document.querySelector("#add-movie"));
    movieDetails.startPoint(document.querySelector("#movie-example"));
    home.startPoint(document.querySelector("#home-page"));
    nav.startPoint(document.querySelector("nav"));
    formRegister.startPoint(document.querySelector("#form-sign-up"));
    formLogIn.startPoint(document.querySelector("#form-login"));

    viewSelector.startPoint(
        document.querySelectorAll(allMenuItemsSelector),
        allMenuItemsSelector,
        changeView
    );
    viewSelector.goToPage("home-page");
})();

async function changeView(view) {
    view = await view;
    [...root.children].forEach((x) => x.remove());
    root.appendChild(view);
}