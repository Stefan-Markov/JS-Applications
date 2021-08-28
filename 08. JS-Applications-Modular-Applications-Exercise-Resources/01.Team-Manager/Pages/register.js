import {html} from "../../../node_modules/lit-html/lit-html.js";
import {ifDefined} from "../../../node_modules/lit-html/directives/if-defined.js";
import {register} from "../Services/dataService.js";

const registerTemplate = (form) => html`
    <section id="register">
        <article class="narrow">
            <header class="pad-med">
                <h1>Register</h1>
            </header>
            <form @submit=${form.submit} id="register-form" class="main-form pad-large">
                ${ifDefined(form.err) ? html`
                    <div class="error">${form.err}</div>` : ""}
                <label>E-mail: <input type="text" name="email"/></label>
                <label>Username: <input type="text" name="username"/></label>
                <label>Password: <input type="password" name="password"/></label>
                <label>Repeat: <input type="password" name="repass"/></label>
                <input class="action cta" type="submit" value="Create Account"/>
            </form>
            <footer class="pad-small">
                Already have an account? <a href="/login" class="invert">Sign in here</a>
            </footer>
        </article>
    </section>`;

export async function registerView(ctx) {
    let form = {submit: onSubmit};
    ctx.render(registerTemplate(form));

    async function onSubmit(e) {
        try {
            e.preventDefault();
            const data = new FormData(e.target);
            const email = data.get("email").trim();
            const username = data.get("username");
            const password = data.get("password").trim();
            const repass = data.get("repass").trim();

            if (email === "" || password === "" || username === "" || repass === "") {
                throw new Error("Please fill all fields");
            }

            if (repass !== password) {
                throw new Error("Passwords must match");
            }

            await register(username, email, password);
            ctx.page.redirect("/home");
        } catch (err) {
            form.err = err.message;
            ctx.render(registerTemplate(form));
        }
    }
}