function attachEvents() {
    let postsBaseUrl = 'http://localhost:3030/jsonstore/blog/posts';
    let commentsBaseUrl = 'http://localhost:3030/jsonstore/blog/comments';
    let postsElement = document.getElementById('posts');
    let btnLoadPosts = document.getElementById('btnLoadPosts');
    btnLoadPosts.addEventListener('click', loadPosts);
    let btnViewPost = document.getElementById('btnViewPost');
    btnViewPost.addEventListener('click', viewPost);
    let postCommentsList = document.getElementById('post-comments');

    function loadPosts() {
        fetch(postsBaseUrl)
            .then(response => response.json())
            .then(posts => {
                for (const post in posts) {
                    let newOption = document.createElement('option');
                    newOption.textContent = posts[post].title;
                    newOption.value = post;
                    postsElement.appendChild(newOption);
                }
            })
            .catch(error => console.log(error));
    }

    function viewPost() {
        clearCommentsSection();
        let currentSelection = postsElement.value;
        fetch(commentsBaseUrl)
            .then(response => response.json())
            .then(comments => {
                for (const comment in comments) {
                    if (comments[comment].postId === currentSelection) {
                        let newComment = document.createElement('li');
                        newComment.id = comments[comment].id;
                        newComment.textContent = comments[comment].text;
                        postCommentsList.appendChild(newComment);
                    }
                }
            })
            .catch(error => console.log(error));
    }

    function clearCommentsSection() {
        while (postCommentsList.firstChild) {
            postCommentsList.firstChild.remove();
        }
    }
}

attachEvents();