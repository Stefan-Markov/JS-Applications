import authService from "./../../services/authService.js";
import { registerTemplate } from "./registerTemplate.js";

async function submitHandler(context, e) {
    e.preventDefault();

    let form = e.currentTarget;
    let formData = new FormData(form);
    console.log(form)
    let user = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    let registerResponse = await authService.register(user);
    console.log(registerResponse)

    context.page.redirect('/dashboard');
}

async function getView(context) {
    //partial application to access the context and avoid nesting submitHandler
    let boundSubmitHandler = submitHandler.bind(null, context);
    let form = {
        submitHandler: boundSubmitHandler,
    }
    let templateResult = registerTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView,
}