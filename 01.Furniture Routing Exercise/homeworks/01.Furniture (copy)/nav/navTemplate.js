import { html } from "./../../node_modules/lit-html/lit-html.js";
import { ifDefined } from "./../../node_modules/lit-html/directives/if-defined.js";
import authService from "../services/authService.js";

// import logoutUser from "./../pages/logout/logout.js";

async function logoutUser(user) {
  await authService.logout(user);
  window.location.href ="/dashboard";
}

export let navTemplate = (navInfo) => html` <h1>
    <a href="/">Furniture Store</a>
  </h1>
  <nav>
    <a
      id="catalogLink"
      href="/dashboard"
      class=${ifDefined(
        navInfo.currentPage.startsWith("/dashboard") ? "active" : undefined
      )}
      >Dashboard</a
    >
    ${navInfo.isLoggedIn ? html `
    <div id="user">
      <a
        id="createLink"
        href="/create"
        class=${ifDefined(
          navInfo.currentPage.startsWith("/create") ? "active" : undefined
        )}
        >Create Furniture</a
      >
      <a
        id="profileLink"
        href="/my-furniture"
        class=${ifDefined(
          navInfo.currentPage.startsWith("/my-furniture") ? "active" : undefined
        )}
        >My Publications</a
      >
      <a type="button" id="logoutBtn" @click=${logoutUser}>Logout</a>
    </div>`
    : html `
    <div id="guest">
        <a id="loginLink" href="/login" class=${ifDefined(
          navInfo.currentPage.startsWith("/login") ? "active" : undefined
        )}>Login</a>
        <a id="registerLink" href="/register" class=${ifDefined(
          navInfo.currentPage.startsWith("/register") ? "active" : undefined
        )}>Register</a>
    </div> `}
  </nav>`;
