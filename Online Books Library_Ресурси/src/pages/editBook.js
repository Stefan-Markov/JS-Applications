import {html} from "../../node_modules/lit-html/lit-html.js";
import {editSingleBookById, getSingleBookById} from "../service/serviceBook.js";

const editBookTemplate = (onSubmit, book) => html`
    <section id="edit-page" class="edit">
        <form @submit=${onSubmit} id="edit-form">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                            <input type="text" name="title" id="title" .value=${book.title}>
                        </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                            <textarea name="description"
                                      id="description" .value=${book.description}></textarea>
                        </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                            <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                        </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                            <select id="type" name="type" .value=${book.type}>
                                <option value="Fiction" selected>Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>`;

export async function editBookPage(ctx) {

    console.log(ctx.params.id);

    const bookId = ctx.params.id;
    const book = await getSingleBookById(bookId);
    ctx.render(editBookTemplate(onSubmit, book));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        const type = formData.get('type');

        if (!title || !description || !type || !imageUrl) {
            return alert('All field are required!');
        }

        await editSingleBookById(bookId, {title, description, type, imageUrl});
        e.target.reset();
        ctx.page.redirect('/details/' + bookId);
    }
}
