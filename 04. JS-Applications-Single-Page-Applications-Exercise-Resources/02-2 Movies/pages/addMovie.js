import { allMenuItemsSelector } from "../app.js";
import auth from "../services/auth.js";
import viewSelector from "../viewSelector.js";

let location = undefined;
let form = undefined;

function startPoint(ref) {
    location = ref;
    location.dataset.viewKey = "add-movie";

    form = location.querySelector("form");
    form.dataset.viewKey = "form-add-movie";
    form.addEventListener("submit", formHandler);
    form.classList.add(allMenuItemsSelector.substring(1));
}

function getView() {
    return location;
}

async function formHandler(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    try {
        if (data.get("title").trim() === "") {
            throw new Error("Please add a movie title");
        }
        if (data.get("description").trim() === "") {
            throw new Error("Please add a movie description");
        }
        if (data.get("imageUrl").trim() === "") {
            throw new Error("Please add movie splash art");
        }

        await auth.serverRequest(
            `http://localhost:3030/data/movies`,
            "post",
            { title: data.get("title"), description: data.get("description"), img: data.get("imageUrl") },
            true
        );
        viewSelector.goToPage("home-page");
    } catch (err) {
        alert(err);
    }
}

let addMovie = { startPoint, getView };

export default addMovie;