import {html} from "../../node_modules/lit-html/lit-html.js";

import {getCarById, updateListing} from '../service/service.js';

const editTemplate = (onSubmit, car) => html`
    <section id="edit-listing">
        <div class="container">

            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" value=${car.brand}>

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" value=${car.model}>

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" value=${car.description}>

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" value=${car.year}>

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${car.imageUrl}>

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" value=${car.price}>

                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>`;


export async function editPage(ctx) {
    const carId = ctx.params.id;
    const car = await getCarById(carId);

    ctx.render(editTemplate(onSubmit, car));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const brand = formData.get('brand');
        const model = formData.get('model');
        const description = formData.get('description');
        const year = Number(formData.get('year'));
        const imageUrl = formData.get('imageUrl');
        const price = Number(formData.get('price'));

        if (year < 0 || price < 0) {
            return alert('Year and Price must be positive numbers!');
        }
        if (!brand || !model || !description || !year || !imageUrl
            || !price) {
            return alert('All field are required!');
        }

        await updateListing(carId, {brand, model, description, year, imageUrl, price});
        e.target.reset();
        ctx.page.redirect('/details/' + carId);
    }
}
