
let movies = [
    { id: 1, title: "Interstellar", genre: "Sci-fi", seen: false },
    { id: 2, title: "The Matrix", genre: "Sci-fi", seen: false },
    { id: 3, title: "Gladiator", genre: "Action", seen: false },
    { id: 4, title: "The Hangover", genre: "Comedy", seen: false },
    { id: 5, title: "The Conjuring", genre: "Horror", seen: false },
    { id: 6, title: "The Shawshank Redemption", genre: "Drama", seen: false }
];

const movieList = document.getElementById("list");
const seenMovies = document.querySelector("#seenMovies");
const genreFilter = document.getElementById("genreFilter");
const movieForm = document.getElementById("movieForm");

function renderMovies() {
    movieList.innerHTML = "";
    seenMovies.innerHTML = "";

    movies.forEach(function(movie) {
        const card = document.createElement("div");
        card.className = "movie-card";

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const genre = document.createElement("p");
        genre.textContent = movie.genre;

        card.append(title, genre);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.onclick = function() {
            movies = movies.filter(function(item) {
                return item.id !== movie.id;
            });

            renderMovies();
        };

        if (movie.seen === true) {
            const status = document.createElement("p");
            status.textContent = "Seen";

            card.append(status, deleteButton);
            seenMovies.appendChild(card);

        } else if (
            genreFilter.value === "All" ||
            genreFilter.value === movie.genre
        ) {
            const addButton = document.createElement("button");
            addButton.textContent = "Add";
            addButton.className = "add-btn";

            addButton.onclick = function() {
                movie.seen = true;
                renderMovies();
            };

            card.append(addButton, deleteButton);
            movieList.appendChild(card);
        }
    });
}

movieForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("movieTitle").value.trim();
    const genre = document.getElementById("movieGenre").value;

    if (title === "" || genre === "") {
        return;
    }

    movies.push({
        id: Date.now(),
        title: title,
        genre: genre,
        seen: false
    });

    genreFilter.value = "All";
    movieForm.reset();
    renderMovies();
});

genreFilter.addEventListener("change", renderMovies);

renderMovies();
