import auth from "./helpers/auth.js";
import homePage from "./pages/home.js";
import loginPage from "./pages/login.js";
import movieDetailsPage from "./pages/movie-details.js";
// import movieDetailsPage from "./views/movieDetails.js";
import registerPage from "./pages/register.js";


let views = {
    'home': async () => await homePage.getView(),
    'login': async () => await loginPage.getView(),
    'register': async () => await registerPage.getView(),
    'movie-details': async (id) => await movieDetailsPage.getView(id),
    'logout': async () => {
        return auth.logout();
    },
    'like': async (id) => await movieDetailsPage.like(id)
};

function initiliaze(allLinkElements) {
    allLinkElements.forEach(a => a.addEventListener('click', changeViewHandler));
}

export async function changeViewHandler(e) {
    let element = e.target.matches('.link')
        ? e.target
        : e.target.closest('.link');
    let route = element.dataset.route;
    let id = element.dataset.id;
    navigateTo(route, id);
}

export async function navigateTo(route, id) {
    console.log(route);
    if (views.hasOwnProperty(route)) {
        let view = await views[route](id);
        let appElement = document.getElementById('main');
        appElement.querySelectorAll('.view').forEach(v => v.remove());
        appElement.appendChild(view);
    }
}

let viewFinder = {
    initiliaze,
    navigateTo,
    changeViewHandler,
};

export default viewFinder;
