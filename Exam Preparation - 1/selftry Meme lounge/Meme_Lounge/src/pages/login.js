import {html} from '../../node_modules/lit-html/lit-html.js';
import {login} from '../service/api.js'
import {notify} from "../notification.js";

const loginTemplate = (onSubmit) => html`
    <section id="login">
        <form @submit=${onSubmit} id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');

        try {
            if (!email || !password) {
                throw new Error('All field are required!');
            }
            await login(email, password);
            ctx.setUserNav();
            ctx.page.redirect('/catalog');
        } catch (e) {
            notify(e.message);
        }
    }
}