import auth from "../services/auth.js";
import viewSelector from "../viewSelector.js";
import nav from "./nav.js";

let location = undefined;

function startPoint(ref) {
    location = ref;
    location.dataset.viewKey = "form-register";

    let form = location.querySelector("form");
    form.addEventListener("submit", requestRegistration);
}

function getView() {
    return location;
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        let data = new FormData(e.target);
        let dataObj = {
            email: data.get("email"),
            password: data.get("password"),
            repeatPassword: data.get("repeatPassword"),
        };

        if (
            dataObj.email.trim() === "" ||
            dataObj.password.trim() === "" ||
            dataObj.repeatPassword.trim() === ""
        ) {
            alert("Fields cannot be empty");
            return;
        }

        if (dataObj.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        if (dataObj.password !== dataObj.repeatPassword) {
            alert("Passwords don't match");
            return;
        }

        await auth.register(dataObj);
        e.target.reset();
        nav.loginUser();
        viewSelector.goToPage("home-page");
    } catch (err) {
        alert(JSON.parse(err.message).message);
    }
}

let formRegister = { startPoint, getView };

export default formRegister;