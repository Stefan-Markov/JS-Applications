import auth from "../services/auth.js";
import viewSelector from "../viewSelector.js";

let location = undefined;
let form = undefined;

function startPoint(ref) {
    location = ref;
    location.dataset.viewKey = "edit-movie";

    form = location.querySelector("form");
    form.addEventListener("submit", editForm);
}

async function getView(id) {
    try {
        let movie = await auth.serverRequest(`http://localhost:3030/data/movies/${id}`);
        location.querySelector('input[name="id"]').value = movie._id;
        location.querySelector('input[name="title"]').value = movie.title;
        location.querySelector('textarea[name="description"]').value = movie.description;
        location.querySelector('input[name="imageUrl"]').value = movie.img;
        return location;
    } catch (err) {
        console.error(err);
        alert(err);
    }
}

async function editForm(e) {
    e.preventDefault();
    let data = new FormData(e.target);

    try {
        await auth.serverRequest(
            `http://localhost:3030/data/movies/${data.get("id")}`,
            "put",
            {title: data.get("title"), description: data.get("description"), img: data.get("imageUrl")},
            true
        );
        viewSelector.goToPage("movie-details", data.get("id"));
    } catch (err) {
        console.error(err);
        alert(err);
    }
}

let editMovie = {startPoint, getView};

export default editMovie;