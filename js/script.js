//fetching character info
//const api = 'https://anapioficeandfire.com/api/characters/';
const api = 'http://thenerdhub.eu/hub/game/gop/json/character.json';


let url = api //+ characterList[i].characterID;

fetch(url)
	.then(result => result.json())
	.then((res) => {
		for (let i = 0; i < res.length; i++) {
		createCard(res,i);
		}
	})
	.catch(err => console.log(err));

 // Creating the character cards
const cards = document.getElementById('cards');
localStorage.clear();

function createCard(result,i) {
	//creating div
	let characterContainer = document.createElement('div');
	characterContainer.classList.add('card');
	characterContainer.classList.add('character-container');
	cards.appendChild(characterContainer);
	//creating title names of the characters
	let name = document.createElement('p');
	name.classList.add('name');
	characterContainer.appendChild(name);
	name.innerHTML = '<h2>' + result[i].Name + '</h2>';
	//source for our character images
	let character = document.createElement('img');
	character.classList.add('character');
	characterContainer.appendChild(character);
	let characterUrl = 'images/characters/';

	//linking character image to card
	character.src = characterUrl + result[i].characterImage //characterList.find(x => x.characterName === result[i].Name ).characterImage;

	//  Culture info	
	let culture = document.createElement('p');
	culture.classList.add('culture');
	characterContainer.appendChild(culture);
		if (result[i].Culture === '') {
		culture.innerHTML = 'Culture: <b>Unknown</b>';
		} else {
			culture.innerHTML = 'Culture: <b>' + result[i].Culture + '</b>'; 
	}

	
	//  Titles info
	let titles = document.createElement('p');
	titles.classList.add('titles');
	characterContainer.appendChild(titles);
		if (result[i].Titles === '')  {
		titles.innerHTML = 'Titles: <b>Unknown</b>';
		} else { 
		titles.innerHTML = 'Titles: ' + result[i].Titles;
		}
		
	


	// Born info
	let born = document.createElement('p');
	born.classList.add('born');
	characterContainer.appendChild(born);
		if (result[i].Born === '') {
			born.innerHTML = 'Born: <b>Unknown</b>';
		} else {
			born.innerHTML = 'Born: <b>' + result[i].Born + '</b>';
		} 
		



	// Banners for selected characters 	
	characterContainer.addEventListener('click', function () {
		if (localStorage.player1 && localStorage.player2) {
			localStorage.clear();
			reset();
			//Extra is created for player 1 so you can overlap pick charcaters more smoodly
			localStorage.player1 = result[i].Name ; // Imgae enlarges while selected
			characterContainer.style.boxShadow = "10px 20px 30px #F8CE44";
			character.style.transform = 'scale(1.3)'; // Imgae enlarges while selected
			createBannerForPlayer1();
		} else if (localStorage.player1) {
			localStorage.player2 = result[i].Name ;
			characterContainer.style.boxShadow = "10px 20px 30px #53A9E2";  // Imgae enlarges while selected
			character.style.transform = 'scale(1.3)';  // Imgae enlarges while selected
			createBannerForPlayer2();
		} else {
			localStorage.player1 = result[i].Name ;
			characterContainer.style.boxShadow = "10px 20px 30px #F8CE44";  //Creates boxshadow around the card selected
			character.style.transform = 'scale(1.3)';    // Imgae enlarges while selected
			createBannerForPlayer1(); 
		}
	});


    // div and class for the banners
	function createBannerForPlayer1() {
		let banner = document.createElement('div');
		banner.classList.add('banner');
		banner.classList.add('banner1'); //banner for player1 
		characterContainer.appendChild(banner);
	}

	function createBannerForPlayer2() {
		let banner = document.createElement('div');
		banner.classList.add('banner');
		banner.classList.add('banner2');  //banner for player2
		characterContainer.appendChild(banner);
	}
}


// reset banner function 
function reset() {
	document.querySelectorAll(".banner").forEach(function (elem) {
		elem.remove();				
	});
	document.querySelectorAll(".banner").forEach(function (elem) {
		elem.remove();												
	});
	document.querySelectorAll(".card").forEach(function (elem) {
		elem.style.boxShadow = 'none';         //removes boxshadow
	});
	document.querySelectorAll(".character").forEach(function (elem) {
		elem.style.transform = 'scale(1)';     //reset image scaling
	});
}

// Ready button - display notify 2 players needed
const ready = document.querySelector('.ready-button');

ready.addEventListener('click', function () {
	if (localStorage.player1 && localStorage.player2) {			//sees if there are 2 characters selected in local storage
		ready.href = 'game.html';                               //if 2 characters selected, you move to next page
		ready.click();

		
	} else {
		alert('You need an opponent, select 2 characters to start'); //else you get an alert telling you 2 players are needed
		ready.href = '#';
	}
}, false);
