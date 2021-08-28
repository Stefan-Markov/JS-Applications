import {render} from '../../node_modules/lit-html/lit-html.js';
import page from "../../node_modules/page/page.mjs";

import {logout as logoutApi} from "./api/data.js";
import {homePage} from "./views/homeview.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {catalogPage} from "./views/catalog.js";
import {createPage} from "./views/create.js";
import {detailsPage} from "./views/details.js";
import {editPage} from "./views/edit.js";
import {profilePage} from "./views/profile.js";

const main = document.querySelector('main');
setUserNav();

document.getElementById('logoutBtn').addEventListener
('click', async () => {
    await logoutApi();
    setUserNav();
    page.redirect('/');
})

page('/', decoratorContext, guestUserOnly, homePage);
page('/login', decoratorContext, loginPage);
page('/register', decoratorContext, registerPage);
page('/catalog', decoratorContext, catalogPage);
page('/create', decoratorContext, createPage);
page('/details/:id', decoratorContext, detailsPage);
page('/edit/:id', decoratorContext, editPage)
page('/profile', decoratorContext, profilePage);


page.start();

function guestUserOnly(ctx, next) {
    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        return ctx.page.redirect('/catalog');
    }
    next();
}

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