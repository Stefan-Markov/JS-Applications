import * as api from "./apiService.js";

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

//app specific requests below

export async function editTeam(id, data) {
    return await api.put(`${api.settings.baseUrl}/data/teams/${id}`, data);
}

export function isLogged() {
    return localStorage.getItem("username") ? true : false;
}

export async function createTeam(name, logoUrl, description) {
    return await api.post(`${api.settings.baseUrl}/data/teams`, {name, logoUrl, description});
}

export async function applyForTeam(id) {
    return await api.post(`${api.settings.baseUrl}/data/members`, {teamId: id});
}

export async function approveAplication(id) {
    return await api.put(`${api.settings.baseUrl}/data/members/${id}`, {status: "member"});
}

export async function declineAplication(id) {
    return await api.del(`${api.settings.baseUrl}/data/members/${id}`);
}

export function getCurrUserId() {
    return localStorage.getItem("userId");
}

export function getCurrUserName() {
    return localStorage.getItem("username");
}

export async function getTeams() {
    return await api.get(`${api.settings.baseUrl}/data/teams`);
}

export async function getMyTeams(id) {
    return await api.get(
        `${api.settings.baseUrl}/data/members?where=_ownerId%3D%22${id}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`
    );
}

export async function getTeamMembers(team) {
    let members = await api.get(`${api.settings.baseUrl}/data/members?where=status%3D%22member%22`);
    members = members.filter((x) => x.teamId === team._id);
    return members;
}

export async function getTeamData(id) {
    let [teamDetails, allMembers] = await Promise.all([
        api.get(`${api.settings.baseUrl}/data/teams/${id}`),
        api.get(
            `${api.settings.baseUrl}/data/members?where=teamId%3D%22${id}%22&load=user%3D_ownerId%3Ausers`
        ),
    ]);
    let data = allMembers.reduce((acc, cur) => {
        if (!acc.hasOwnProperty(cur.status)) {
            acc[cur.status] = [];
        }
        acc[cur.status].push(cur);
        return acc;
    }, {});
    teamDetails.members = data;

    return teamDetails;
}