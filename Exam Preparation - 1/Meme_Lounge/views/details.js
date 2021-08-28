import {html} from '../../../node_modules/lit-html/lit-html.js';
import {deleteMeme, getMemeById} from "../api/data.js";


const detailsMemesTemplate = (meme, isOwner, onDelete) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>

                ${isOwner ? html`
                    <a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click="${onDelete}" class="button danger">Delete</button>` : ''
                }
            </div>
    </section>`;


export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    let id = ctx.params.id;

    const meme = await getMemeById(id);

    const isOwner = userId === meme._ownerId;
    ctx.render(detailsMemesTemplate(meme, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteMeme(id);
            ctx.page.redirect('/catalog');
        }
    }
}