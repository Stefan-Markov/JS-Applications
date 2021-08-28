let form = document.querySelector(`form`);
form.addEventListener(`submit`, getDetails);

async function getDetails(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let name = formData.get(`name`);
    let image = formData.get(`img`);
    //getting ingredients with \n for new line after every word, 
    //split then by that to get an array, 
    //map them to trim the empty space
    //filter to get only elements with words
    let ingredients = formData.get(`ingredients`)
    .split(`\n`)
    .map(x => x.trim())
    .filter(x => x != "");
    let preparation = formData.get(`steps`)
    .split(`\n`)
    .map(x => x.trim())
    .filter(x => x != "");

    const token = sessionStorage.getItem(`userToken`);
    console.log(token)
    const response = await fetch(`http://localhost:3030/data/recipes`, {
        method: `post`,
        headers: {
            "Content-Тype": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify({name, image, ingredients, preparation})
    });
    
    if (response.ok != true){
        const error = await response.json();
        return alert(error.message);
    } else {
        window.location.pathname = `/1/lesson-03/base/index.html`;
    }
    
}