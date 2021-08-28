function attachEvents() {
    const basePostsUrl = 'http://localhost:3030/jsonstore/blog/posts/';
    const baseCommentsUrl = 'http://localhost:3030/jsonstore/blog/comments/';

    let selectPostsElement = document.getElementById('posts');
    let ulComments = document.getElementById('post-comments');
    let h1PostTitleElement = document.getElementById('post-title');
    let ulPostBodyElement = document.getElementById('post-body');

    let loadPostsBtn = document.getElementById('btnLoadPosts');
    let viewPostBtn = document.getElementById('btnViewPost');

    loadPostsBtn.addEventListener('click', () => {

        fetch(basePostsUrl)
            .then(response => response.json())
            .then(data => {

                for (const post of Object.values(data)) {
                    let option = document.createElement('option');
                    option.value = post.id;
                    option.textContent = post.title.toUpperCase();

                    selectPostsElement.appendChild(option);
                }
            })
            .catch(error => console.log(error));
    });

    viewPostBtn.addEventListener('click', () => {

        let id = selectPostsElement.value;

        while (ulComments.firstChild) {
            ulComments.firstChild.remove();
        }

        fetch(`${basePostsUrl}${id}`)
            .then(response => response.json())
            .then(data => {
                h1PostTitleElement.textContent = data.title.toUpperCase();
                ulPostBodyElement.textContent = data.body;
            })
            .catch(error => console.log(error));


        fetch(baseCommentsUrl)
            .then(response => response.json())
            .then(data => {

                for (const comment of Object.values(data)) {
                    if (comment.postId === id) {
                        let li = document.createElement('li');

                        li.textContent = comment.text;
                        li.id = comment.id;

                        ulComments.appendChild(li);
                    }
                }
            })
            .catch(error => console.log(error));
    })
}

attachEvents();