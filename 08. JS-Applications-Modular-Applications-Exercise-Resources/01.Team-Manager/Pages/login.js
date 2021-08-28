import { html } from "../../../node_modules/lit-html/lit-html.js";
import { ifDefined } from "../../../node_modules/lit-html/directives/if-defined.js";
import { login } from "../Services/dataService.js";

const loginTemplate = (form) => html`<section id="login">
  <article class="narrow">
    <header class="pad-med">
      <h1>Login</h1>
    </header>
    <form @submit=${form.submit} id="login-form" class="main-form pad-large">
      ${ifDefined(form.err) ? html`<div class="error">${form.err}</div>` : ""}
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <input class="action cta" type="submit" value="Sign In" />
    </form>
    <footer class="pad-small">
      Don't have an account? <a href="/register" class="invert">Sign up here</a>
    </footer>
  </article>
</section>`;

export async function loginView(ctx) {
    let form = { submit: onSubmit };

    ctx.render(loginTemplate(form));

    async function onSubmit(e) {
        try {
            e.preventDefault();
            const data = new FormData(e.target);
            const email = data.get("email").trim();
            const password = data.get("password").trim();

            if (email == "" || password == "") {
                throw new Error("Please fill all fields");
            }

            await login(email, password);
            ctx.page.redirect("/home");
        } catch (err) {
            form.err = err.message;
            ctx.render(loginTemplate(form));
        }
    }
}