import auth from "../services/auth.js";
import viewSelector from "../viewSelector.js";

let location = undefined;

function startPoint(ref) {
    location = ref;
    location.dataset.viewKey = "form-login";

    let form = location.querySelector("form");
    form.addEventListener("submit", requestLogIn);
}

function getView() {
    return location;
}

async function requestLogIn(e) {
    e.preventDefault();

    try {
        let data = new FormData(e.target);
        let dataObj = { email: data.get("email"), password: data.get("password") };
        await auth.logIn(dataObj);
        e.target.reset();
        viewSelector.goToPage("home-page");
    } catch (err) {
        alert(JSON.parse(err.message).message);
    }
}

let formLogIn = { startPoint, getView };

export default formLogIn;