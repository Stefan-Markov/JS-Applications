import {html} from "../../../node_modules/lit-html/lit-html.js";
import {
    getTeamData,
    getCurrUserId,
    applyForTeam,
    declineAplication,
    approveAplication,
} from "../Services/dataService.js";

const teamControllsTemplate = (team, visitorId) => html`
    <div>
        ${visitorId === team._ownerId
                ? html` <a href="/edit/${team._id}" class="action">Edit team</a> `
                : ""}
        ${team.members.member.some((member) => member._ownerId === visitorId) &&
        team._ownerId !== visitorId
                ? html`
                    <a
                            href="/decline/${team.members.member.find((m) => m._ownerId === visitorId)._id}"
                            class="action invert"
                    >Leave team</a
                    >
                `
                : html`
                    ${team._ownerId !== visitorId &&
                    visitorId !== null &&
                    team.members.pending.every((member) => member._ownerId !== visitorId)
                            ? html` <a href="/join-team" class="action">Join team</a> `
                            : ""}
                `}
        ${team.members.pending.some((member) => member._ownerId === visitorId)
                ? html`
                    Membership pending.
                    <a
                            href="/decline/${team.members.pending.find((member) => member._ownerId === visitorId)
                                    ._id}"
                    >Cancel request</a
                    >
                `
                : ""}
    </div>`;

const teamCurrentMembersTemplate = (team, visitorId) => html`
    <div class="pad-large">
        <h3>Members</h3>
        <ul class="tm-members">
            ${team.members.member.map((m) => singleTeamMemberTemplate(m, team, visitorId))}
        </ul>
    </div>`;

const singleTeamMemberTemplate = (member, team, visitorId) => html`
    <li>
        ${member.user.username}
        ${member._ownerId !== team._ownerId && visitorId === team._ownerId
                ? html`<a href="/decline/${member._id}" class="tm-control action">Remove from team</a>`
                : ""}
    </li>
`;

const teamMemberRequestsTemplate = (team) => html`
    <div class="pad-large">
        <h3>Membership Requests</h3>
        <ul class="tm-members">
            ${team.members.pending.map((r) => {
                if (r !== undefined) {
                    return singleRequestTemplate(r);
                }
                return "";
            })}
        </ul>
    </div>`;

const singleRequestTemplate = (request) => html`
    <li>
        ${request.user.username}
        <a href="/approve/${request._id}" class="tm-control action">Approve</a>
        <a href="/decline/${request._id}" class="tm-control action">Decline</a>
    </li>`;

const teamHomeTemplate = (team, visitorId) => html`
    <section id="team-home">
        <article class="layout">
            <img src=${team.logoUrl} class="team-logo left-col"/>
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${team.members.member.length} Members</span>
                <!-- teamControll -->
                ${teamControllsTemplate(team, visitorId)}
            </div>
            <!-- team Members -->
            ${teamCurrentMembersTemplate(team, visitorId)}
            <!-- team member requests -->
            ${visitorId === team._ownerId ? teamMemberRequestsTemplate(team) : ""}
        </article>
    </section>`;

let teamInfo;

export async function teamHomeView(ctx) {
    let team = await getTeamData(ctx.params.id);

    if (team.members.pending === undefined) {
        team.members.pending = [];
    }

    let visitorId = getCurrUserId();

    team.request = requestToJoin;
    team.accept = acceptRequestToJoin;
    team.decline = declineRequestToJoin;

    ctx.render(teamHomeTemplate(team, visitorId));
    teamInfo = team;
}

export async function requestToJoin(ctx) {
    await applyForTeam(teamInfo._id);
    ctx.page.redirect(`/team-home/${teamInfo._id}`);
}

export async function acceptRequestToJoin(ctx) {
    await approveAplication(ctx.params.id);
    ctx.page.redirect(`/team-home/${teamInfo._id}`);
}

export async function declineRequestToJoin(ctx) {
    await declineAplication(ctx.params.id);
    ctx.page.redirect(`/team-home/${teamInfo._id}`);
}