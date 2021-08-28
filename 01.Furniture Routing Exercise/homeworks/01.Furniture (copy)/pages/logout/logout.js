// import authService from "./../../services/authService.js";

async function logoutUser(context, e) {
    e.preventDefault();
    // console.log("test");
    // alert("hi")
    await authService.logout(user);
    context.page.redirect("/dashboard");
}

export default {
    logoutUser
}