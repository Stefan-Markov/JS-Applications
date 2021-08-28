import {html} from '../../../node_modules/lit-html/lit-html.js';
import {register} from "../api/data.js";
import {notify} from "../notification.js";

const registerTemplate = (onSubmit) => html`
    <section id="register">
        <form @submit=${onSubmit} id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;


export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formDate = new FormData(e.target);
        const username = formDate.get('username');
        const email = formDate.get('email');
        const password = formDate.get('password');
        const repeatPass = formDate.get('repeatPass');
        const gender = formDate.get('gender');

        try {
            if (!username || !email || !password ||
                !repeatPass || !gender) {
                // return alert('All field are required!')
                throw  new Error('All field are required!')
            }
            if (password !== repeatPass) {
                // return alert('Password don\'t mach!');
                throw  new Error('Password don\'t mach!');
            }
            await register(username, email, password, gender);

            ctx.setUserNav();
            ctx.page.redirect('/catalog');
        } catch (error) {
            notify(error.message)
        }
    }
}