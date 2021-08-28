import {html} from "../../../node_modules/lit-html/lit-html.js";

const overlayTemplate = () => html`
    <div class="overlay" style="display: none">
        <div class="modal">
            <p>Overlay message</p>
            <a href="#" class="action">Action</a>
        </div>
    </div>`;