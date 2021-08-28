export default /*javascript*/`
    <li class="card" id="movie-card-template" style="width: 18rem;">
        <img src="{{imageUrl}}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">{{description}}</p>
            <a href="#" ?disabled={{isDisabled}} class="btn btn-primary">Show Details</a>
        </div>
    </li>
`;