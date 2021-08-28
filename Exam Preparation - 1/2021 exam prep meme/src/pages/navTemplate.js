import {html} from '../../node_modules/lit-html/lit-html.js'

export let navTemplate = ()=>html`nav>
<a href="#">All Memes</a>
<!-- Logged users -->
<div class="user">
    <a href="#">Create Meme</a>
    <div class="profile">
        <span>Welcome, {email}</span>
        <a href="#">My Profile</a>
        <a href="#">Logout</a>
    </div>
</div>
<!-- Guest users -->
<div class="guest">
    <div class="profile">
        <a href="#">Login</a>
        <a href="#">Register</a>
    </div>
    <a class="active" href="#">Home Page</a>
</div>
</nav>`;