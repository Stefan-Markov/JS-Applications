import auth from "../services/auth.js";
import { ce } from "../utils.js";
import viewSelector from "../viewSelector.js";

let location = undefined;

function startPoint(ref) {
    location = ref;
    location.dataset.viewKey = "movie-details";
}

async function getView(id) {
    try {
        let userId = auth.getUserId();
        let movie = auth.serverRequest(`http://localhost:3030/data/movies/${id}`);
        let userLikes = auth.serverRequest(
            `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`
        );
        let likes = auth.serverRequest(
            `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`
        );

        [movie, userLikes, likes] = await Promise.all([movie, userLikes, likes]);

        let canLike = true;
        if (userId === movie._ownerId || userLikes.length > 0) {
            canLike = false;
        }

        let movieContainer = location.querySelector(".container");
        [...movieContainer.children].forEach((x) => x.remove());

        movieContainer.appendChild(movieDetailsCard(movie, canLike, likes, userId));
    } catch (err) {
        console.error(err);
        alert(err);
    }
    return location;
}

async function deleteMovie(id) {
    try {
        await auth.serverRequest(`http://localhost:3030/data/movies/${id}`, "delete", undefined, true);
        return viewSelector.redirectToPage("home-page");
    } catch (err) {
        console.error(err);
        alert(err);
    }
}

async function likeMovie(id) {
    try {
        await auth.serverRequest(`http://localhost:3030/data/likes`, "Post", { movieId: id }, true);
        let likes = await auth.serverRequest(
            `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`
        );
        location.querySelector(".like").remove();
        location.querySelector(".likes").innerText = `Liked: ${likes}`;
        return viewSelector.redirectToPage("movie-details", id);
    } catch (err) {
        console.error(err);
        alert(err);
    }
}

function movieDetailsCard(movie, canLike, likes, userId) {
    let titleElement = ce("h1", {}, movie.title);
    let divImg = ce(
        "div",
        { class: "col-md-8" },
        ce("img", { class: "img-thumbnail", src: movie.img, alt: "Movie" })
    );

    let delBtn = ce(
        "a",
        { class: "btn btn-danger menu-item", href: "#", onClick: viewSelector.handler },
        "Delete"
    );
    delBtn.dataset.viewKey = `delete-movie/${movie._id}`;
    let editBtn = ce(
        "a",
        { class: "btn btn-warning menu-item", href: "#", onClick: viewSelector.handler },
        "Edit"
    );
    editBtn.dataset.viewKey = `edit-movie/${movie._id}`;
    let likeBtn = ce(
        "a",
        { class: "btn btn-primary menu-item like", href: "#", onClick: viewSelector.handler },
        "Like"
    );
    likeBtn.dataset.viewKey = `like-movie/${movie._id}`;
    let span = ce("span", { class: "enrolled-span likes" }, `Liked ${likes}`);

    let div = ce(
        "div",
        { class: "col-md-4 text-center" },
        ce("h3", { class: "my-3" }, "Movie Description"),
        ce("p", {}, movie.description)
    );

    if (canLike) {
        div.appendChild(likeBtn);
    }

    if (userId === movie._ownerId) {
        div.append(delBtn, editBtn);
    }

    div.appendChild(span);

    let card = ce("div", { class: "row bg-light text-dark" }, titleElement, divImg, div);

    return card;
}

let movieDetails = { startPoint, getView, deleteMovie, likeMovie };

export default movieDetails;