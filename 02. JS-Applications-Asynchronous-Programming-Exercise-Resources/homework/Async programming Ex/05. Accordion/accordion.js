function solution() {
  async function myFetch() {
    let response = await fetch(
      "http://localhost:3030/jsonstore/advanced/articles/list"
    );
    // console.log(response);
    return await response.json();
  }
  //fetch the data
  (async () => {
    let articleRequest = await fetch(
      "http://localhost:3030/jsonstore/advanced/articles/list"
    );
    let articles = await articleRequest.json();

    await myFetch();

    let articleSection = document.querySelector("#main");

    Object.keys(articles).forEach((key) => {
      let article = articles[key];
      // console.log(articles);
      let htmlArticle = createArticle(article.title, article._id);
      articleSection.appendChild(htmlArticle);
    });
  })();

  myFetch().catch((e) => {
    console.log(
      "There has been a problem with your fetch operation: " + e.message
    );
  });

  //create HTML structure
  function createArticle(title, id) {
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("accordion");
    let headDiv = document.createElement("div");
    headDiv.classList.add("head");
    let spanHead = document.createElement("span");
    spanHead.textContent = title;
    let headButton = document.createElement("button");
    headButton.classList.add("button");
    headButton.setAttribute("id", id);
    headButton.textContent = "More";
    headButton.addEventListener("click", toggleContent);

    headDiv.appendChild(spanHead);
    headDiv.appendChild(headButton);

    let extraDiv = document.createElement("div");
    extraDiv.classList.add("extra");
    let text = document.createElement("p");
    // text.textContent = "test";
    extraDiv.appendChild(text);

    mainDiv.appendChild(headDiv);
    mainDiv.appendChild(extraDiv);

    return mainDiv;
  }

  async function toggleContent(e) {
    let button = e.target;
    let link = document.querySelector(".extra");
    let contentArticle = document.querySelectorAll("p");

    let url = `http://localhost:3030/jsonstore/advanced/articles/details/${button.id}`;
    let response = await fetch(url);
    let data = await response.json();
    contentArticle.textContent = data.content;
    // console.log(data)

    Object.keys(data).forEach((el) => {
      el = data._id;
      let content = data.content;
      // console.log(content)
      if (el === button.id) {
        for (let article of Array.from(contentArticle)) {
          article.textContent = content;
        }
        //it changes only the first el
      }
    });

    button.textContent = button.textContent === "More" ? "Less" : "More";
    link.style.display = link.style.display === "block" ? "none" : "block";
  }
}
solution();
