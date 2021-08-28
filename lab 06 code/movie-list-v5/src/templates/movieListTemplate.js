import { html } from 'lit-html';
import movieTemplate from './movieTemplate.js';

export default (movies) => html`
    <h1>Movie List</h1>

    <ul class="movie-list">
        ${movies.map(x => html`${movieTemplate(x)}`)}
    </ul>
`;