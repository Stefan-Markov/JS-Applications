import { render, html } from 'lit-html';
import movieListTemplate from './src/templates/movieListTemplate.js';
import movieService from './src/services/movieService.js';

let rootElement = document.querySelector('#root');

function onDetailsClickHanlder(e) {
    console.log(e);
} 

movieService.getAll()
    .then(movies => {
        movies[0].onDetailsClick = onDetailsClickHanlder;

        let movieListTemplateResult = movieListTemplate(movies);
        
        render(movieListTemplateResult, rootElement);
    });