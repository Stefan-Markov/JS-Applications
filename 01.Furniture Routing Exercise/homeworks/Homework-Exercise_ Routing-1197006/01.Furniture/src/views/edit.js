import {html} from "../../node_modules/lit-html/lit-html.js";
import {getItemById,editRecord} from '../api/data.js';

const editTemplate = (item, onSubmit) => html `
<form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" .value=${item.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model" .value=${item.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year" .value=${item.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" .value=${item.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" .value=${item.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" .value=${item.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const item = await getItemById(id);

    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(event) {

        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData);

        //Взимаме всичките неща от формата за попълване като ги поставяме в keys,values 
        const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {
            [k]: v
        }), {});

        //Валидираме дали едно всичките полета са попълнени ако не са хвърляме Error
        if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == '')) {
            return alert('Please fill all the mandatory fields!sssssss');
        }

        data.year = Number(data.year);
        data.price = Number(data.price);
        await editRecord(item._id, data);

        ctx.page.redirect('/')
    }
}