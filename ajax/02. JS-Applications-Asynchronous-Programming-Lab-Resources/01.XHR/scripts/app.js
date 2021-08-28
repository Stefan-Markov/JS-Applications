function loadRepos() {
    fetch("https://api.github.com/users/testnakov/repos")
        .then(response => solve(response))
        .catch(error);

    function solve(response) {
        let div = document.getElementById('res');
        let ul = document.createElement('ul');
        for (const responseElement of response) {
            let li = document.createElement('li');
            li.textContent = responseElement;
            ul.appendChild(li);
        }
        div.appendChild(ul);
    }
    function error(error) {
        let div = document.getElementById('res');
        let p = document.createElement('p');
        p.textContent = error.status;
        div.appendChild(p)
    }
}