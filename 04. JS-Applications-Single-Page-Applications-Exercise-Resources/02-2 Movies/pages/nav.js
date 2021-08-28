import auth from "../services/auth.js";

let location = undefined;

function startPoint(ref) {
    location = ref;
    location.dataset.viewKey = "nav-menu";
    if (auth.isLoggedIn()) {
        loginUser();
    } else {
        logoutUser();
    }
}

function getView() {
    return location;
}

function loginUser() {
    location.querySelector("#greeting").innerText = `Wellcome, ${auth.getUserName()}`;
    [...location.querySelectorAll(".user")].forEach((x) => x.classList.remove("hidden"));
    [...location.querySelectorAll(".guest")].forEach((x) => x.classList.add("hidden"));
}

function logoutUser() {
    location.querySelector("#greeting").innerText = `Wellcome, guest`;
    [...location.querySelectorAll(".user")].forEach((x) => x.classList.add("hidden"));
    [...location.querySelectorAll(".guest")].forEach((x) => x.classList.remove("hidden"));
}

let nav = { startPoint, getView, loginUser, logoutUser };

export default nav;