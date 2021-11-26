const API_URL = "http://www.omdbapi.com/?&apikey=e6328603&s=";
const API_SEARCH_URL = "http://www.omdbapi.com/?apikey=e6328603&i=";

var searchInputBox = document.getElementsByClassName("input_search_text")[0];
var textBox = document.getElementById("text_view");
var card_list_box = document.getElementsByClassName("card_list")[0];

var countCard = 0;

function searchMovies(){
	countCard = 0;
	card_list_box.innerHTML=``;
	var query = searchInputBox.value; //alert(query);
	if(query) {
		getMovies(API_URL+query); 
		//alert(API_URL+query); 
	} 
}

async function getMovies(url) {
	const response = await fetch(url);
	const respData = await response.json();
	showMovies(respData.Search);
}

function showMovies(movies) {
	//alert("showMoviesfuncn");
	movies.forEach(async function(movie) {
		const movieData = await fetch(API_SEARCH_URL+movie.imdbID);
		const movieDataObj = await movieData.json();
		displayMovies(movieDataObj);
	});	
}

function displayMovies(iMovie) {
	//alert(iMovie.Title);
	const newCard = document.createElement("div");
	newCard.classList.add("movie_data_card");
	newCard.innerHTML = `
					<div class="poster">
						<img style="border-radius: 10px;" src="${iMovie.Poster}">
					</div>
					<div class="movie_info">
						<p>Title : ${iMovie.Title}</p>
						<p>Release Date : ${iMovie.Released}</p>
						<p>Genre : ${iMovie.Genre}</p>
						<p>Directed by : ${iMovie.Director}</p>
						<p>Written by : ${iMovie.Writer}</p>
					</div>`;
	card_list_box.appendChild(newCard);
	iMovie.Ratings.forEach(function(rating){
		const ratingP = document.createElement("p");
		ratingP.innerHTML = `${rating.Source} : ${rating.Value}`;
		document.getElementsByClassName("movie_info")[countCard].appendChild(ratingP);
	});
	countCard+=1;
	textBox.innerHTML=`<p>${countCard} movies found. Scroll down to see info.</p>`;
}