import {html} from "../../../node_modules/lit-html/lit-html.js";
import {editTeam, getTeamData} from "../Services/dataService.js";
import {ifDefined} from "../../../node_modules/lit-html/directives/if-defined.js";

const editTemplate = (form) => html`
    <section id="edit">
        <article class="narrow">
            <header class="pad-med">
                <h1>Edit Team</h1>
            </header>
            <form @submit=${form.submit} id="edit-form" class="main-form pad-large">
                ${ifDefined(form.err) ? html`
                    <div class="error">${form.err}</div>` : ""}
                <label>Team name: <input type="text" name="name" .value=${form.team.name}/></label>
                <label>Logo URL: <input type="text" name="logoUrl" .value=${form.team.logoUrl}/></label>
                <label
                >Description: <textarea name="description" .value=${form.team.description}></textarea>
                </label>
                <input class="action cta" type="submit" value="Save Changes"/>
            </form>
        </article>
    </section>`;

export async function editView(ctx) {
    let team = await getTeamData(ctx.params.id);
    let form = {
        submit: onSubmit,
        team,
    };
    console.log(form);
    ctx.render(editTemplate(form));

    async function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        try {
            const name = data.get("name").trim();
            const logoUrl = data.get("logoUrl").trim();
            const description = data.get("description").trim();

            if (name === "" || logoUrl === "" || description === "") {
                throw new Error("Please fill all fields");
            }

            if (name.length < 4) {
                throw new Error("Team name must be at least 4 characters long!");
            }

            if (description.length < 10) {
                throw new Error("Team description must be at least 10 characters long!");
            }

            let res = await editTeam(team._id, {name, logoUrl, description});
            console.log(res);
            ctx.page.redirect(`/team-home/${team._id}`);
        } catch (err) {
            form.err = err.message;
            ctx.render(editTemplate(form));
        }
    }
}