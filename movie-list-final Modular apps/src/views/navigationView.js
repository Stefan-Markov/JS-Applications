import { html } from '../../../node_modules/lit-html/lit-html.js';

const showUserInfo = (email) => html`
    <span>Welcome ${email}</span>
`;

const guestButtons = () => html`
    <a class="nav-link" href="/login">Login</a>
    <a class="nav-link" href="/register">Register</a>
`;

const privateButtons = () => html`
    <a class="nav-link" href="/my-movies">My Movies</a>
`;

const navigationTemplate = (isAuthenticated, email) => html`
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">MovieDB</a>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                        <a class="nav-link" href="/movies">Movies</a>
                        ${isAuthenticated 
                            ? privateButtons()
                            : guestButtons()
                        }
                    </div>
                </div>
                ${isAuthenticated && showUserInfo(email)}
            </div>
        </nav>
`;

export function renderNavigation(ctx) {
    return navigationTemplate(ctx.isAuthenticated, ctx.email);
}