import articlesData from '../articlesData.js';
import {titleFormatter} from '../utils.js';

const articlesTemplate = (data) => /*javascript*/`
    <article>
        <h3>${data.title}</h3>
        <a href="/articles/${titleFormatter(data.title)}">Read More</a>
    </article>
`;

export default function(context) {
    let rootElement = document.querySelector('.root');

    rootElement.innerHTML = articlesData.map(x => articlesTemplate(x)).join('<hr>');
}