import {html} from "../../node_modules/lit-html/lit-html.js";
import {deleteBookById, getLikes, getSingleBookById, postLikesInDb} from "../service/serviceBook.js";

const detailsBookTemplate = (book, isOwner, onDelete, visible, getBookLikes) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                ${isOwner ? html`
                            <a class="button" href="/edit/${book._id}">Edit</a>
                            <a class="button" @click="${onDelete}" href="javascript:void(0)">Delete</a>`
                        : ''}


                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->

                ${visible ? html` <a class="button" id="buttonLikes" href="#">Like</a>` : ''}


                <!-- ( for Guests and Users )  -->

                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${getBookLikes}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>`;

export async function detailsPageBook(ctx) {
    console.log(ctx.params);
    const bookId = ctx.params.id;
    const book = await getSingleBookById(bookId);
    const userId = sessionStorage.getItem('userId');
    const isOwner = userId && userId === book._ownerId;
    const visible = userId !== book._ownerId && userId;

    const getBookLikes = await getLikes(bookId);
    ctx.render(detailsBookTemplate(book, isOwner, onDelete, visible, getBookLikes));


    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteBookById(bookId);
            ctx.page.redirect('/');
        }
    }

    document.getElementById('buttonLikes')
        .addEventListener('click', await postLikesInDb({bookId}));
}