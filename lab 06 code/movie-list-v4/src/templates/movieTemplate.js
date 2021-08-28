export default (movie) => /*javascript*/`
    <li class="card" id="movie-card-template" style="width: 18rem;">
        <img src="${movie.imageUrl}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.description}</p>
            <a href="#" class="btn btn-primary">Show Details</a>
        </div>
    </li>
`;