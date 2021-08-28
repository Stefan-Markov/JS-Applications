import {render} from '../node_modules/lit-html/lit-html.js';
import page from "../node_modules/page/page.mjs";
import {homePage} from "./pages/home.js";
import {loginPage} from "./pages/login.js";
import {logout as logoutApi} from '../src/service/data.js'
import {registerPage} from "./pages/register.js";
import {catalogPage} from "./pages/catalog.js";
import {memeDetails} from "./pages/details.js";
import {createPage} from "./pages/create.js";
import {editPage} from "./pages/edit.js";
import {profilePage} from "./pages/profile.js";

const main = document.querySelector('main');
setUserNav();

page('/', decoratorContext, guestUserOnly, homePage);
page('/login', decoratorContext, loginPage);
page('/register', decoratorContext, registerPage);
page('/catalog', decoratorContext, catalogPage);
page('/details/:id', decoratorContext, memeDetails);
page('/create', decoratorContext, createPage);
page('/edit/:id', decoratorContext, editPage);
page('/profile', decoratorContext, profilePage);

page.start();


document.getElementById('logoutBtn').addEventListener
('click', async () => {
    await logoutApi();
    setUserNav();
    page.redirect('/');
})

function decoratorContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const email = sessionStorage.getItem('email');
    if (email != null) {
        document.querySelector('div.profile > span').textContent = `Welcome ${email}`;
        document.querySelector('.user').style.display = '';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = '';
    }
}

function guestUserOnly(ctx, next) {
    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        return ctx.page.redirect('/catalog');
    }
    next();
}