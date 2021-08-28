document.getElementById('load-character').addEventListener('click', loadCharacter);


function loadCharacter() {
    let baseUrl = 'https://swapi.dev/api';

    let ul = document.createElement('ul');


    fetch(`https://swapi.dev/api/people/3`)
        .then(res => res.json())
        .then((character) => {
            let li = document.createElement('li');
            li.textContent = character.name;
            ul.appendChild(li);
            console.log(character);
        })
        .catch(error => {
            let li = document.createElement('li');
            li.appendChild(error.status)
            console.log('rejected: ' + error);
        })
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(ul);

}

function oldLoadCharacter() {
    let baseUrl = 'https://swapi.dev/api';

    let promise = fetch(`${baseUrl}/people/1`)

    promise.then((response) => {
        if (response.ok) {
            let jsonResponse = response.json();
            jsonResponse.then((character) => {
                console.log(character);
            });
        }
    });
}