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
  const movieTable = document.createElement('table');
  var movieTr = document.createElement('tr');
  movieTable.appendChild(movieTr);
  Object.keys(movieList[0]).forEach((title) => {
    const movieTh = document.createElement('th');
    movieTh.textContent = title;
    movieTr.appendChild(movieTh);
  })

  movieList.forEach((movie) => {
    movieTr = document.createElement('tr');
    movieTable.appendChild(movieTr);
    Object.keys(movie).forEach((movieProperty) => {
      const movieTd = document.createElement('td');
      movieTd.textContent = movie[movieProperty];
      movieTr.appendChild(movieTd);
    })
  })
  movieDiv.appendChild(movieTable);

}

const deleteAll = function(event){
  const list = document.getElementById("movie-list");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  };
  localStorage.clear();
  movieList = [];
}
