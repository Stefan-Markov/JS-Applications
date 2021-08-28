import page from "./../node_modules/page/page.mjs";
import nav from "./nav/nav.js";
import createPage from "./pages/create/createPage.js";
import dashboardPage from "./pages/dashboard/dashboardPage.js";
import detailsPage from "./pages/details/detailsPage.js";
import loginPage from "./pages/login/loginPage.js";
import registerPage from "./pages/register/registerPage.js";
import renderingMiddleware from "./rendering/renderingMiddleware.js";

let appContainer = document.getElementById("viewContainer");
let navContainer = document.getElementById("navigation");
renderingMiddleware.initialize(appContainer, navContainer);

page("/dashboard", renderingMiddleware.decorateContext, nav.getView, dashboardPage.getView);
page("/index.html", "/dashboard");
page("/", "/dashboard");
page("/details/:id", renderingMiddleware.decorateContext, nav.getView, detailsPage.getView);
page("/login", renderingMiddleware.decorateContext, nav.getView, loginPage.getView);
page("/register", renderingMiddleware.decorateContext, nav.getView, registerPage.getView);
page("/create", renderingMiddleware.decorateContext, nav.getView, createPage.getView);

page.start();
