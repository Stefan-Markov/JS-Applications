import {html} from "../../../node_modules/lit-html/lit-html.js";
import {getTeamMembers, getTeams, isLogged} from "../Services/dataService.js";

const teamCardTemplate = (team) => html`
    <article class="layout">
        <img src=${team.logoUrl} class="team-logo left-col"/>
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${team.members.length} Members</span>
            <div><a href="/team-home/${team._id}" class="action">See details</a></div>
        </div>
    </article>`;

const browseTemplate = (list, isUser) => html`
    <section id="browse">
        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>
        ${isUser
                ? html`
                    <article class="layout narrow">
                        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
                    </article>`
                : ""}
        ${list.map((t) => teamCardTemplate(t))}
    </section>`;

export async function browseView(ctx) {
    let teamsList = await getTeams();
    for (const team of teamsList) {
        team.members = await getTeamMembers(team);
    }

    // console.log(teamsList);

    ctx.render(browseTemplate(teamsList, isLogged()));
}