import authService from "./../../services/authService.js";
import { loginTemplate } from "./loginTemplate.js";

async function submitHandler(context, e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let user = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    let loginResponse = await authService.login(user);

    context.page.redirect('/dashboard');
}

async function getView(context) {
    //partial application to access the context and avoid nesting submitHandler
    let boundSubmitHandler = submitHandler.bind(null, context);
    let form = {
        submitHandler: boundSubmitHandler,
    }
    let templateResult = loginTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView,
    submitHandler
}