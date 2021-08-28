import * as api from './api/api.js'
import {render} from '../node_modules/lit-html/lit-html.js'
import page from "../node_modules/page/page.mjs";
import {homePage} from "./pages/home.js";
import {loginPage} from "./pages/auth.js";
import {registerPage} from "./pages/auth.js"
import {catalogPage} from "./pages/catalog.js";
import {detailsPage} from "./pages/details";
import {createPage} from "./pages/create.js";
import {editPage} from "./pages/edit.js";
import {profilePage} from "./pages/profile.js";
import {searchPage} from "./pages/search.js";


document.getElementById('logoutBtn').addEventListener('click', logoutAction);

function logoutAction() {
    api.logout();
    page.redirect('/');
}

const main = document.getElementById('site-content');
setUserNav();
page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/all-listings', decorateContext, catalogPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/my-listings', decorateContext, profilePage);
page('/search', decorateContext, searchPage);
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    ctx.user = {
        username: localStorage.getItem('username'),
        _id: localStorage.getItem('_id'),
        accessToken: localStorage.getItem('accessToken'),
    }

    next();
}

function setUserNav() {
    const user = localStorage.getItem('username');

    if (user) {
        document.getElementById('profile').style.display = '';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user-greeting').textContent = `Welcome ${user.username}`
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}