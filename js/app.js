document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');
  const form = document.querySelector('#new-item-form');
  form.addEventListener('submit', handleFormSubmit);

  renderList();

  const input = document.querySelector('#delete_all');
  input.addEventListener('click', deleteAll);

});

let movieList;
if (JSON.parse(localStorage.getItem('movies')) !== null){
  movieList = JSON.parse(localStorage.getItem('movies'));
} else {
  movieList = [];
}

const handleFormSubmit = function(event){
  event.preventDefault();

  const newMovie={
    title:event.target.title.value,
    genre:event.target.genre.value,
    length:event.target.length.value,
    rating: event.target.rating.value,
  };

  movieList.push(newMovie);

  localStorage.setItem('movies', JSON.stringify(movieList));

  renderList();
  event.target.reset();
};

const renderList = function(){
  const movieDiv = document.querySelector('#movie-list');

  movieDiv.innerHTML = "";

  const movieList = JSON.parse(localStorage.getItem('movies'));
  movieList.forEach((movie) => {
    const movieUl = document.createElement('ul');
    const titleLi = document.createElement('li');
    titleLi.textContent = `Title: ${movie.title}`;

    const genreLi = document.createElement('li');
    genreLi.textContent = `Genre: ${movie.genre}`;

    const lengthLi = document.createElement('li');
    lengthLi.textContent = `Length: ${movie.length}`;

    const ratingLi = document.createElement('li');
    ratingLi.textContent = `Rating: ${movie.rating}`;

    movieUl.appendChild(titleLi);
    movieUl.appendChild(genreLi);
    movieUl.appendChild(lengthLi);
    movieUl.appendChild(ratingLi);

    movieDiv.appendChild(movieUl);
  })
}

const deleteAll = function(event){
  const list = document.getElementById("movie-list");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  };
  return movieList=[];
}
