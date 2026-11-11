const errorElement = document.querySelector("#error");
const postsElement = document.querySelector("#posts");


async function getPosts() {
    try{
    const response = await fetch("https://dummyjson.com/posts?limit=10");

    if(!response.ok){
        throw new Error("Kunde inte hämta inläggen. Försök igen senare.")
    } 

    const data = await response.json();
    renderPosts(data.posts);

    } catch (error) {
        errorMessage(error.message);
}}
getPosts()

function errorMessage(message){
errorElement.textContent = message;
errorElement.hidden = false;
}

function renderPosts (posts) {
    posts.forEach(function(post) {

        const card = document.createElement("article");

        const title = document.createElement("h2");

        const link = document.createElement("a");
        link.href = "post.html?id=" + post.id;
        link.textContent = post.title;
        title.appendChild(link)

        const content = document.createElement("p");
        content.textContent = post.body;

        const tags = document.createElement("p");
        tags.textContent = post.tags.join (", ");

        const reactions = document.createElement("p");
        reactions.textContent = "👍 " + post.reactions.likes + " " + "👎 " + post.reactions.dislikes;

        const views = document.createElement("p");
        views.textContent = "views " + post.views;

        card.append(title, content, tags, reactions, views);
        postsElement.appendChild(card);
    });
}


