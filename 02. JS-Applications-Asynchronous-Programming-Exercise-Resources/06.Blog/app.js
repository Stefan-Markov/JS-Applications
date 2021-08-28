function attachEvents() {
    let obj = {};

    let select = document.getElementById('posts');
    let onLoadButton = document.getElementById('btnLoadPosts');
    let pTag = document.createElement('p');
    let ulComments = document.getElementById('post-comments');
    onLoadButton.addEventListener('click', loadItems)


    let buttonView = document.getElementById('btnViewPost');
    buttonView.addEventListener('click', viewItem)

    function viewItem(e) {
        e.preventDefault();

        pTag.textContent = '';
        let input = document.getElementById('posts');
        let id = input.value;
        console.log(id);
        let h1 = document.getElementsByTagName('h1')[0];
        h1.textContent = obj[id].title;

        let postBodyUL = document.getElementById('post-body');
        pTag.textContent = obj[id].body;
        postBodyUL.appendChild(pTag);

        fetch(`http://localhost:3030/jsonstore/blog/comments`)
            .then(res => res.json())
            .then(data => {
                let entries = Object.entries(data);
                console.log(entries)
                Array.from(ulComments.children).forEach(el => el.remove());

                for (const entry of entries) {
                    if (obj[id].id === entry[1].postId) {
                        let li = document.createElement('li');
                        li.textContent = entry[1].text;
                        li.setAttribute('value', entry[0])
                        ulComments.appendChild(li);
                    }
                }
            })
    }

    function loadItems(e) {
        e.preventDefault();
        onLoadButton.disabled = true;

        fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(res => res.json())
            .then(data => {
                let result = Object.entries(data);
                for (const d of result) {
                    let element = appendElement(d[0], d[1].title);
                    select.appendChild(element);
                    obj[d[0]] = {
                        body: d[1].body,
                        title: d[1].title,
                        id: d[1].id
                    }
                }
            })
            .catch(error => console.log(error));
    }

    function appendElement(id, title) {
        let option = document.createElement('option');
        option.setAttribute('value', id);
        option.textContent = title;
        return option;
    }
}

attachEvents();