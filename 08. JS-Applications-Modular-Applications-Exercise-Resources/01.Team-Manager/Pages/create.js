import {html} from "../../../node_modules/lit-html/lit-html.js";
import {ifDefined} from "../../../node_modules/lit-html/directives/if-defined.js";
import {
    applyForTeam,
    approveAplication,
    createTeam,
    getCurrUserId,
} from "../Services/dataService.js";

const createTemplate = (form) => html`
    <section id="create">
        <article class="narrow">
            <header class="pad-med">
                <h1>New Team</h1>
            </header>
            <form @submit=${form.submit} id="create-form" class="main-form pad-large">
                ${ifDefined(form.err) ? html`
                    <div class="error">${form.err}</div>` : ""}
                <label>Team name: <input type="text" name="name"/></label>
                <label>Logo URL: <input type="text" name="logoUrl"/></label>
                <label>Description: <textarea name="description"></textarea></label>
                <input class="action cta" type="submit" value="Create Team"/>
            </form>
        </article>
    </section>`;