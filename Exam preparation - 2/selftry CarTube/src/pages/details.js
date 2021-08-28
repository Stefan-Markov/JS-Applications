import {deleteListing, getCarById} from "../service/service.js";

import {html} from "../../node_modules/lit-html/lit-html.js";


const detailsTemplate = (car, isOwner, onDelete) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}$</li>
            </ul>

            <p class="description-para">${car.description}</p>

            <div class="listings-buttons">
                ${isOwner ? html`<a href="/edit/${car._id}" class="button-list">Edit</a>
                <a @click="${onDelete}" href=javascript:void(0) class="button-list">Delete</a>` : ''}

            </div>
        </div>
    </section>
`;


export async function detailsPage(ctx) {
    const carId = ctx.params.id;
    const car = await getCarById(carId);
    const userId = sessionStorage.getItem('userId');
    const isOwner = userId && userId === car._ownerId;
    ctx.render(detailsTemplate(car, isOwner, onDelete));

    async function onDelete() {

        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteListing(carId);
            ctx.page.redirect('/all-listings');
        }
    }
}

