function attachEvents() {
  // Posts - http://localhost:3030/jsonstore/blog/posts
  // Comments - http://localhost:3030/jsonstore/blog/comments

  let btnLoad = document.getElementById("btnLoadPosts");
  btnLoad.addEventListener("click", loadPosts);
  //fetch the posts
  async function loadPosts() {
    const postRequest = await fetch(
      "http://localhost:3030/jsonstore/blog/posts"
    );
    const posts = await postRequest.json();
    // console.log(posts);

    Object.keys(posts).forEach((key) => {
      let post = posts[key];
      let selection = document.querySelector("#posts");
      // console.log(articles);
      let option = createOption(post.body, post.id, post.title);
      selection.appendChild(option);
    });
  }

  let btnViewPosts = document.getElementById("btnViewPost");
  btnViewPosts.addEventListener("click", viewContent);
  let postId = document.getElementById("posts").value;

  async function viewContent() {
    const viewRequest = await fetch(
      `http://localhost:3030/jsonstore/blog/posts/${postId}`
    );
    const views = await viewRequest.json();

    const postTitle = document.getElementById("post-title");
    const postBody = document.getElementById("post-body");

    Object.keys(views).forEach((key) => {
      if (document.getElementById("posts").value === views[key].id) {
        postTitle.textContent = views[key].title;
        postBody.textContent = views[key].body;
      }
    });

    const commentsRequest = await fetch(
      `http://localhost:3030/jsonstore/blog/comments`
    );
    const data = await commentsRequest.json();

    let commentsUl = document.getElementById("post-comments");
    commentsUl.textContent = "";
    let comments = Object.values(data).filter(
      (el) => el.postId === document.getElementById("posts").value
    );

    comments.map(createComment).forEach((c) => {
    //   console.log(c);
      commentsUl.appendChild(c);
    });
  }

  function createOption(body, id, title) {
    let optionTag = document.createElement("option");
    optionTag.setAttribute("value", id);
    optionTag.textContent = title;

    return optionTag;
  }
  function createComment(comment) {
    // console.log(comment);
    let commentLi = document.createElement("li");
    commentLi.setAttribute("id", comment.id);
    commentLi.textContent = comment.text;

    return commentLi;
  }
}

attachEvents();
