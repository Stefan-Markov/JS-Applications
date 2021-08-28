import {html} from "../../node_modules/lit-html/lit-html.js";
import {getAllBooksFromDb} from "../service/serviceBook.js";

const homeTemplate = (books) => html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        <!-- Display ul: with list-items for All books (If any) -->
        <ul class="other-books-list">
            <!--            <li class="otherBooks">-->
            <!--                <h3>A Court of Thorns and Roses</h3>-->
            <!--                <p>Type: Fiction</p>-->
            <!--                <p class="img"><img src="./images/book1.png"></p>-->
            <!--                <a class="button" href="#">Details</a>-->
            <!--            </li>-->

            <!--            <li class="otherBooks">-->
            <!--                <h3>Outlander</h3>-->
            <!--                <p>Type: Other</p>-->
            <!--                <p class="img"><img src="/images/book2.png"></p>-->
            <!--                <a class="button" href="#">Details</a>-->
            <!--            </li>-->

            <!--            <li class="otherBooks">-->
            <!--                <h3>To Kill a Mockingbird</h3>-->
            <!--                <p>Type: Classic</p>-->
            <!--                <p class="img"><img src="/images/book3.png"></p>-->
            <!--                <a class="button" href="#">Details</a>-->
            <!--            </li>-->

            ${books.length === 0 ? html` <p class="no-books">No books in database!</p>` :
                    books.map(bookTemplateSingle)}
        </ul>
        <!--        &lt;!&ndash; Display paragraph: If there are no books in the database &ndash;&gt;-->
        <!--        <p class="no-books">No books in database!</p>-->
    </section>`;


export async function homepageBook(ctx) {
    const books = await getAllBooksFromDb();

    ctx.render(homeTemplate(books));
}

const bookTemplateSingle = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>`;