const search = document.getElementById("search");
const btn = document.querySelector(".btn");
const title = document.getElementById("movie-title");
const searchList = document.getElementById("search-list");

// hide & show search widget
btn.addEventListener("click", () => {
  console.log(123);
  search.classList.toggle("active");
  search.focus();
  btn.classList.toggle("active");
});

const getMovies = async (userInput) => {
  const API = `http://www.omdbapi.com/?s=${userInput}&page=1 &apikey=c497e7d4`;
  const response = await fetch(API);
  const data = await response.json();
  // console.log(data)
  if (data.Response === "True") {
    // console.log(data.Search)
    displayMovies(data.Search);
  }
};

// getMovies('batman')

const findMovies = () => {
  let userInput = search.value.trim();
  console.log(userInput);
  if (userInput.length > 0) {
    searchList.classList.remove("hidden");
    getMovies(userInput);
  } else {
    searchList.classList.add("hidden");
  }
};

search.addEventListener("change", findMovies);

const displayMovies = (movies) => {
  searchList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div");
    // console.log(movieListItem)
    movieListItem.dataset.id = movies[i].imdbID;
    // console.log(movies[i].imdbID)
    movieListItem.classList.add("search-list-items");
    if (movies[i].Poster !== "N/A") {
      moviePoster = movies[i].Poster;
    } else {
      moviePoster = "Image_not_available.png";
    }

    movieListItem.innerHTML = `
        <div class="search-list-images">
          <img src="${moviePoster}" alt="movies">
        </div>
        <div class="search-item-info">
          <h3>${movies[i].Title}</h3>
          <p>${movies[i].Year}</p>
        </div>`;

    searchList.appendChild(movieListItem);
  }
};
