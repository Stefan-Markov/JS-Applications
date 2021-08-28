import { allMenuItemsSelector } from "../app.js";
import auth from "../services/auth.js";
import { ce } from "../utils.js";
import viewSelector from "../viewSelector.js";

let location = undefined;
let addMovieBtn = undefined;

function startPoint(ref) {
    location = ref;
    location.dataset.viewKey = "home-page";
    addMovieBtn = location.querySelector("#addMovieBtn");
}

async function getView() {
    await populateMovies();
    return location;
}

async function populateMovies() {
    try {
        let movieArr = await auth.serverRequest("http://localhost:3030/data/movies", "get");
        let movieContainer = location.querySelector("#movies-container");
        [...movieContainer.children].forEach((c) => c.remove());
        addMovieBtn.remove();
        if (auth.isLoggedIn()) {
            location.querySelector("#movies-heading").after(addMovieBtn);
        }
        movieArr.forEach((movie) => {
            movieContainer.appendChild(movieCard(movie));
        });
    } catch (err) {
        console.error(err);
        alert(err);
    }
}

function movieCard(movie) {
    let img = ce("img", {
        class: "card-img-top",
        src: movie.img,
        alt: "Card image cap",
        width: "400",
    });
    let cardBody = ce("div", { class: "card-body" }, ce("h4", { class: "card-title" }, movie.title));
    let button = ce("button", { type: "button", class: "btn btn-info" }, "Details");
    let aEle = ce("a", {
        "data-view-key": `movie-details/${movie._id}`,
        class: `${allMenuItemsSelector.substring(1)}`,
        href: `#/details/${movie._id}`,
        onClick: viewSelector.handler,
    });
    if (auth.isLoggedIn()) {
        aEle.appendChild(button);
    }

    let card = ce(
        "div",
        { class: "card mb-4" },
        img,
        cardBody,
        ce("div", { class: "card-footer" }, aEle)
    );
    return card;
}

let home = { startPoint, getView };

export default home;