import {html} from "../../../node_modules/lit-html/lit-html.js";
import {getCurrUserId, getMyTeams, getTeamMembers} from "../Services/dataService.js";

const notInvolvedTemplate = () => html`
    <article class="layout narrow">
        <div class="pad-med">
            <p>You are not a member of any team yet.</p>
            <p>
                <a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your
                own team.
            </p>
        </div>
        <div class=""><a href="/create" class="action cta">Create Team</a></div>
    </article>`;

const teamCardTemplate = (person) => html`
    <article class="layout">
        <img src=${person.team.logoUrl} class="team-logo left-col"/>
        <div class="tm-preview">
            <h2>${person.team.name}</h2>
            <p>${person.team.description}</p>
            <span class="details">${person.team.members.length} Members</span>
            <div><a href="/team-home/${person.team._id}" class="action">See details</a></div>
        </div>
    </article>`;

const myTeamsTemplate = (myTeams) => html`
    <section id="my-teams">
        <article class="pad-med">
            <h1>My Teams</h1>
        </article>
        ${myTeams.length === 0 ? notInvolvedTemplate() : myTeams.map((team) => teamCardTemplate(team))}
    </section>`;

export async function myTeamsView(ctx) {
    let myTeams = await getMyTeams(getCurrUserId());

    for (const team of myTeams) {
        let members = await getTeamMembers(team.team);
        team.team.members = members;
    }

    console.log(myTeams);

    ctx.render(myTeamsTemplate(myTeams));
}