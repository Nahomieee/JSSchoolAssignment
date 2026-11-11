const id = new URLSearchParams(window.location.search).get("id");

const errorElement = document.querySelector("#error");
const postElement = document.querySelector("#post");
const commentsElement = document.querySelector("#comments");
const theComment = document.querySelector("#commentForm");
const commentInput = document.querySelector("#commentInput");
const deleteBtn = document.querySelector("#deleteBtn");
const editBtn = document.querySelector("#editBtn");
const editForm = document.querySelector("#editForm");
const editTitle = document.querySelector("#editTitle");
const editBody = document.querySelector("#editBody");

let currentPost;

async function getPost(){
    try{
        const response = await fetch(`https://dummyjson.com/posts/${id}`);

     if (!response.ok){
        throw new Error("Kunde inte hämta inläggen. Försök igen senare.");
        }

        const post = await response.json();
        currentPost = post;
        console.log(post)

        renderPost(post);

    } catch(error) {
        errorMessage(error.message)
    }
}


getPost()

function errorMessage (message) {
    errorElement.textContent = message;
    errorElement.hidden = false; 
}

function renderPost(post) {
    const title = document.createElement("h1");
    title.textContent = post.title;

    const content = document.createElement("p");
    content.textContent = post.body;

    const tags = document.createElement("p");
    tags.textContent = post.tags.join (", ");

    const reactions = document.createElement("p");
    reactions.textContent = "👍 " + post.reactions.likes + " " + "👎 " + post.reactions.dislikes;

    const views = document.createElement("p");
    views.textContent = "views " + post.views;

    postElement.append(title, content, tags, reactions, views);

};

async function getComments(){
    try{
        const response = await fetch(`https://dummyjson.com/comments/post/${id}`)

        if(!response.ok){
            throw new Error("Kunde inte hämta kommentarerna")
        }
        const data = await response.json();
        console.log(data.comments);

        data.comments.forEach(function(comment) {
            renderComment(comment);
        });

    }catch (error) {
        errorMessage(error.message)

    }
}

getComments()

function renderComment(comment){
    const commentSection =  document.createElement("div");

    const username = document.createElement("p");
    username.textContent = comment.user.username;

    const commentContent = document.createElement("p");
    commentContent.textContent = comment.body;

    commentSection.append(username, commentContent);

    commentsElement.appendChild(commentSection);

}
 
theComment.addEventListener("submit", async (event) => {
     event.preventDefault();

    const comment = commentInput.value.trim();

    if (comment === ""){
        return;
    } 

    try {
        const response = await fetch('https://dummyjson.com/comments/add', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body: comment, postId: Number(id), userId: 1 })
        });
    if (!response.ok) {
        throw new Error("Kunde inte skicka kommentaren.");
    }

    const newComment = await response.json();
    renderComment(newComment);
    commentInput.value = "";

    } catch (error) {
        errorMessage(error.message);

} });

deleteBtn.addEventListener("click", async ()=> {
    try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok){
            throw new Error("Kunde inte radera inlägget")
        }

        postElement.innerHTML = "";
        commentsElement.innerHTML = ""; 

    } catch (error) {
        errorMessage(error.message);
    }

});

editBtn.addEventListener("click", () => {
    editForm.hidden = false;

    editTitle.value = currentPost.title;
    editBody.value = currentPost.body;
});

editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

try{
    const response = await fetch(`https://dummyjson.com/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        title: editTitle.value,
        body: editBody.value
    })
    });

    if (!response.ok){
        throw new Error("Kunde inte redigera inlägget")}

    const updatedPost = await response.json()
    currentPost = updatedPost;
    postElement.innerHTML = "";
    renderPost(updatedPost);
    editForm.hidden = true;
  
  } catch (error) {
    errorMessage(error.message);
  }

})