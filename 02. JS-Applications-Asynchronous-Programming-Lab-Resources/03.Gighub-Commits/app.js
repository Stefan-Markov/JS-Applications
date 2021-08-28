function loadCommits() {

    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let output = document.getElementById('commits');

    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    sendRequest(url);

    async function sendRequest(url) {
        try {
            output.textContent = '';
            let response = await fetch(url);
            if (response.status !== 200) {
                throw (response);
            }
            let data = await response.json();
            data.forEach(record => {
                let li = document.createElement('li');
                li.textContent = `${record.commit.author.name}: ${record.commit.message}`;
                output.appendChild(li);
            });
        } catch (err) {
            let li = document.createElement('li');
            li.textContent = `Error: ${err.status} (${err.statusText})`;
            output.appendChild(li);
        }
    }
}