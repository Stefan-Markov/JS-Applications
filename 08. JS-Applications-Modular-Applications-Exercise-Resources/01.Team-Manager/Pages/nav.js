import {html} from "../../../node_modules/lit-html/lit-html.js";
import {isLogged, logout} from "../Services/dataService.js";

const settings = {
    location,
};

const navTemplate = (isUser, currLoc) => html`<a href="/home" class="site-logo">Team Manager</a>
<nav>
    <a href="/browse" class="action ${currLoc === "browse" ? "active" : ""}">Browse Teams</a>
    ${isUser
            ? ""
            : html`<a href="/login" class="action ${currLoc === "login" ? "active" : ""}">Login</a>`}
    ${isUser
            ? ""
            : html`<a href="/register" class="action ${currLoc === "register" ? "active" : ""}"
            >Register</a
            >`}
    ${isUser
            ? html`<a href="/my-teams" class="action ${currLoc === "my-teams" ? "active" : ""}"
            >My Teams</a
            >`
            : ""}
    ${isUser ? html`<a href="/logout" class="action">Logout</a>` : ""}
</nav>`;

async function getView(ctx, next) {
    let currLoc = ctx.path.split("/").filter((x) => x.length > 0)[0];
    ctx.navRender(navTemplate(isLogged(), currLoc));
    next();
}

export async function signOutUser(ctx) {
    await logout();
    ctx.page.redirect("/home");
}

const nav = {
    getView,
    settings,
};

export default nav;