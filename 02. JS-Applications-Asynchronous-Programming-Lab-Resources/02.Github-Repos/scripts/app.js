function loadRepos() {

    let username = document.getElementById('username').value;
    let output = document.getElementById('repos');

    fetch(`https://api.github.com/users/${username}/repos`)

        .then(emptyUl())
        .then(response => {
            if(response.status === 200){
               return  response.json();
            }
        })
        .then(dataJSON => addToHTML(dataJSON))
        .catch(error => addError(error)
        );

    function emptyUl() {
        output.innerHTML = '';
    }

    function addToHTML(dataJSON) {
        for (const repo of dataJSON) {
            let a = document.createElement('a');
            a.href = repo.html_url;
            a.textContent = repo.full_name;
            let li = document.createElement('li');
            li.appendChild(a);
            output.appendChild(li);
        }
    }

    function addError(err) {
        let li = document.createElement('li');
        li.textContent = err;
        output.appendChild(li);
    }
}