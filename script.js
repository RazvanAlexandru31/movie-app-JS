const search = document.getElementById("search");
const btn = document.querySelector(".btn");
const title = document.getElementById("movie-title");
const searchList = document.getElementById("search-list");
const searchList2 = document.getElementById("search-list-2");
const movieCard = document.querySelector(".movie-card");

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
    // movieListItem.style.cursor="pointer";
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
    search.value = "";
    searchList.appendChild(movieListItem);
  }
  displayMovieCard();
};

const displayMovieCard = () => {
  const moviesFromSearchList =
    searchList.querySelectorAll(".search-list-items");
  moviesFromSearchList.forEach((movie) => {
    // console.log(movie);
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id);
      movieCard.classList.remove("hidden");
      const cardAPI = `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=c497e7d4`;
      const response = await fetch(cardAPI);
      const data = await response.json();
      console.log(data);
      showMovieCard(data);
    });
  });
};

const showMovieCard = (movie) => {
  const {
    Actors,
    Awards,
    Country,
    Director,
    Genre,
    Language,
    Plot,
    Poster,
    Rated,
    Released,
    Runtime,
    Title,
    Writer,
    Year,
    imdbRating,
    imdbVotes,
  } = movie;

  movieCard.innerHTML = `
   <div class="card-image">
        <img
          src="${Poster}"
          alt="movie poster"
        />
      </div>
      <div class="card-body">
        <span class="card-title">${Title}</span>
        <p class='movie-info-1'>
          <span class="card-year">${Year}</span>
          <span class="card-time">${Runtime}</span>
          <span class="card-rating">${Rated}</span>
        </p>
        <p class='movie-info-2'>
        <span class="card-language">${Language}</span>
        <span class="card-genre">${Genre}</span>
        <span class="card-released">${Released}</span>
      </p>
        <p class="card-plot">
          ${Plot}
        </p>
        <div class="people">
        <p class="card-director">
          Director <span>${Director}</span>
        </p>
        <p class="card-writers">
          Writers <span>${Writer}</span>
        </p>
        <p class="card-stars">
          Stars <span>${Actors}</span>
        </p>
        <div class="awards">
        Awards: ${Awards}
      </div>
      <div class="rating">
        <p class="rating-1"> <span>IMDb Rating</span><span> ${imdbRating}</span></p>
        <p class="rating-2"> <span>IMDb Votes</span><span>${imdbVotes}</span></p>
      </div>
      </div>
      </div>
  `;
};
