import addMovie from "./pages/addMovie.js";
import editMovie from "./pages/editMovie.js";
import formLogIn from "./pages/formLogIn.js";
import formRegister from "./pages/formRegister.js";
import home from "./pages/home.js";
import movieDetails from "./pages/movieDetails.js";
import auth from "./services/auth.js";

let views = {
    "add-movie": async () => addMovie.getView(),
    "edit-movie": async (id) => editMovie.getView(id),
    "delete-movie": async (id) => movieDetails.deleteMovie(id),
    "like-movie": async (id) => movieDetails.likeMovie(id),
    "form-login": async () => formLogIn.getView(),
    "form-logout": async () => auth.logOut(),
    "form-register": async () => formRegister.getView(),
    "home-page": async () => home.getView(),
    "movie-details": async (id) => movieDetails.getView(id),
    "nav-menu": async () => nav.getView(),
};

let getViewFunc = undefined;
let selector = undefined;

export function startPoint(elementsList, elementsSelector, callback) {
    selector = elementsSelector;
    elementsList.forEach((el) => el.addEventListener("click", handler));
    getViewFunc = callback;
}

export function handler(e) {
    let element = e.target.matches(selector) ? e.target : e.target.closest(selector);
    if (element.dataset.viewKey !== undefined) {
        let [viewKey, id] = element.dataset.viewKey.split("/");
        goToPage(viewKey, id);
    }
}

export function goToPage(viewKey, id) {
    if (views[viewKey] !== undefined) {
        getViewFunc(views[viewKey](id));
    }
}

export function redirectToPage(viewKey, id) {
    if (views[viewKey] !== undefined) {
        return views[viewKey](id);
    }
}

let viewSelector = {
    redirectToPage,
    goToPage,
    handler,
    startPoint,
};

export default viewSelector;