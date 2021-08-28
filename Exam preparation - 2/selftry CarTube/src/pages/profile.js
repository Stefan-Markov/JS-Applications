import {html} from "../../node_modules/lit-html/lit-html.js";
import {myCars} from "../service/service.js";

const profileTemplate = (cars) => html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">

            ${cars.length === 0 ? html`
                        <p class="no-cars"> You haven't listed any cars yet.</p>` :
                    cars.map(carTemplate)};
        </div>
    </section>`;

export async function profilePage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const cars = await myCars(userId);

    ctx.render(profileTemplate(cars));
}



const carTemplate = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`


