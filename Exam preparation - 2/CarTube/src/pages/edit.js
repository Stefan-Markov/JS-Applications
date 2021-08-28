import {html} from "../../node_modules/lit-html/lit-html.js";
import {getListingById, updateListing} from '../api/data.js';

const editTemplate = (car, onSubmit) => html`
    <section id="edit-listing">
        <div class="container">

            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" value="">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value=${car.brand}>

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value=${car.model}>

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value=${car.description}>

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.year}>

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value=${car.imageUrl}>

                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>`;

export async function editPage(ctx) {
    const carId = ctx.params._id;
    const car = await getListingById(carId);

    ctx.render(editTemplate(car, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const editedCar = {
            brand: formData.get('brand').trim(),
            model: formData.get('model').trim(),
            description: formData.get('description').trim(),
            year: Number(formData.get('year').trim()),
            imageUrl: formData.get('imageUrl').trim(),
            price: Number(formData.get('price').trim())
        };

        if (editedCar.year < 0 || editedCar.price < 0) {
            return alert('Year and Price must be positive numbers!');
        }

        if (Object.values(editedCar).some(x => x !== false)) {
            return alert('All fields are required!');
        }
        await updateListing(carId, editedCar);
        event.target.reset();
        ctx.page.redirect('/details/' + carId);
    }
}
