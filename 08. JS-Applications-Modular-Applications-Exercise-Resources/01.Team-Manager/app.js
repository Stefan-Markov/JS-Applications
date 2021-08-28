import page from "../../node_modules/page/page.mjs";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { render } from "../../node_modules/lit-html/lit-html.js";


import nav, { signOutUser } from "./Pages/nav.js";
import { browseView } from "./Pages/browse.js";
import { createView } from "./Pages/create.js";
import { editView } from "./Pages/edit.js";
import { homeView } from "./Pages/home.js";
import { loginView } from "./Pages/login.js";
import { myTeamsView } from "./Pages/myTeams.js";
import { registerView } from "./Pages/register.js";
import {
    acceptRequestToJoin,
    declineRequestToJoin,
    requestToJoin,
    teamHomeView,
} from "./Pages/teamHome.js";

const baseUrl = "http://localhost:3030";
api.settings.baseUrl = baseUrl;

//debug
import * as api from "./Services/apiService.js";
window.api = api;
//debug

let root;
let navLoc;
let mainLoc;

page(decoContext);
page(nav.getView);

page("/", "/home");
page("/browse", browseView);
page("/create", createView);
page("/edit/:id", editView);
page("/home", homeView);
page("/login", loginView);
page("/logout", signOutUser);
page("/my-teams", myTeamsView);
page("/register", registerView);
page("/team-home/:id", teamHomeView);
page("/join-team", requestToJoin);
page("/decline/:id", declineRequestToJoin);
page("/approve/:id", acceptRequestToJoin);

const baseTemplate = () => html` <div id="content">
  <header id="titlebar" class="layout"></header>
  <main></main>
  <footer id="footer">SoftUni &copy; 2014-2021</footer>
</div>`;

page.start();

// navLoc = document.querySelector("header#titlebar");
// mainLoc = document.querySelector("main");
// nav.settings.location = navLoc;

async function decoContext(ctx, next) {
    root = document.querySelector("body");
    render(baseTemplate(), root);

    navLoc = document.querySelector("header#titlebar");
    mainLoc = document.querySelector("main");
    nav.settings.location = navLoc;

    ctx.navRender = (content) => render(content, navLoc);
    ctx.render = (content) => render(content, mainLoc);
    next();
}