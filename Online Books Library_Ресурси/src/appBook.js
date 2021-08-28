import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import {homepageBook} from "./pages/homepageBook.js";
import {loginPage} from "./pages/loginBook.js";
import {logout} from './service/serviceBook.js';
import {registerPage} from "./pages/registerBook.js";
import {createBook} from "./pages/addBook.js";
import {detailsPageBook} from "./pages/detailsBook.js";
import {editBookPage} from "./pages/editBook.js";
import {profileBookPage} from "./pages/profileBook.js";


const main = document.getElementById('site-content');
setUserNav();

page('/', decorateContext, homepageBook);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/addbook', decorateContext, createBook);
page('/details/:id', decorateContext, detailsPageBook);
page('/edit/:id', decorateContext, editBookPage);
page('/profile', decorateContext, profileBookPage);
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
    const email = sessionStorage.getItem('email');

    if (email) {
        document.getElementById('user').style.display = '';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user-greeting').textContent = `Welcome, ${email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}