import {render} from '../node_modules/lit-html/lit-html.js'
import page from "../node_modules/page/page.mjs";
import {homePage} from "./pages/home.js";
import {loginPage} from "./pages/login.js";
import {logout} from './service/service.js'
import {registerPage} from "./pages/register.js";
import {catalogPage} from "./pages/catalog.js";
import {createPage} from "./pages/create.js";
import {detailsPage} from "./pages/details.js";
import {editPage} from "./pages/edit.js";
import {profilePage} from "./pages/profile.js";
import {searchPage} from "./pages/search.js";

const main = document.getElementById('site-content');
setUserNav();
page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/all-listings', decorateContext, catalogPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/my-listings', decorateContext, profilePage);
page('/search', decorateContext, searchPage)
page.start();

document.getElementById('logoutBtn').addEventListener('click', logoutAction);

async function logoutAction() {
    await logout();
    setUserNav();
    page.redirect('/');
}

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}


function setUserNav() {
    const user = sessionStorage.getItem('username');

    if (user) {
        document.getElementById('profile').style.display = '';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user-greeting').textContent = `Welcome ${user}`;
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}