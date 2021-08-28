import {html} from "../../node_modules/lit-html/lit-html.js";

import {login, register} from '../api/data.js'


const loginTemplate = (onSubmit) => html` <section id="login">
    <div @submit=${onSubmit} class="container">
      <form id="login-form" >
        <h1>Login</h1>
        <p>Please enter your credentials.</p>
        <hr>

        <p>Username</p>
        <input placeholder="Enter Username" name="username" type="text">

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn" value="Login">
      </form>
      <div class="signin">
        <p>Dont have an account?
          <a href="/register">Sign up</a>.
        </p>
      </div>
    </div>
  </section>`;

const registerTemplate = (onSubmit) => html`
    <section @submit=${onSubmit} id="register">
        <div class="container">
            <form id="register-form">
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
    </section>
`;


export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const username = form.get('username');
        const password = form.get('password');

        await login(username, password);
        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/all-listings')
    }
}

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit))

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
        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/all-listings')
    }
}
