import {html} from "../../node_modules/lit-html/lit-html.js";
import {register} from '../service/service.js'

const registerTemplate = (onsubmit) => html`
    <section id="register">
        <div class="container">
            <form @submit=${onsubmit} id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>

                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>

                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const username = form.get('username').trim();
        const password = form.get('password').trim();
        const repeatPass = form.get('repeatPass').trim();

        if (!username || !password) {
            return alert('All fields are required!');
        }
        if (password !== repeatPass) {
            return alert('Password don\'t match!');
        }

        await register(username, password);
        ctx.setUserNav();
        ctx.page.redirect('/all-listings');
    }
}