// Fetching players 
const playerKey1 = localStorage.key(0);
const playerKey2 = localStorage.key(1);
const player = ["",localStorage.getItem(playerKey1),localStorage.getItem(playerKey2)]; 

//character image 
var characterList = [
	{characterID:148, characterName:"Arya Stark", characterImage:"arya.png"},
	{characterID:238, characterName:"Jon Snow", characterImage:"jon.png"},-
	{characterID:529, characterName:"Daenerys Targaryen", characterImage:"danny.png"},
	{characterID:583, characterName:"Melisandre", characterImage:"melisandre.png"},
	{characterID:743, characterName:"Cersei Lannister", characterImage:"cersei.png"},
	{characterID:957, characterName:"Visenya Targaryen", characterImage:"visenya.png"},
	{characterID:1052, characterName:"Jaime Lannister", characterImage:"jaime.png"},
	{characterID:271, characterName:"Tyrion Lannister", characterImage:"tyrion.png"},
	{characterID:2024, characterName:"Sansa Stark", characterImage:"sansa.png"},
	{characterID:2071, characterName:"Tormund", characterImage:"tormund.png"}
	];

// Variables 
// Global Variables
let playersTurn = 1;
let playerscore = [0,0,0]; //playerscore. can add moore players 
//player position varibles
let xPosition = [0,0,50];
let yPosition = [0,150,150];
// game board 
const gameBoard = document.querySelector('#game-board'); 
let gamecharacter = ["",document.createElement('img'),document.createElement('img')];  // attaches the image to the game character
//player image
let character = ["",document.createElement('img'),document.createElement('img')];  

//active players
for (let p = 1; p < player.length; p++) {
	
	var pCharacter = document.querySelector('.p' + p + '-character');

	character[p].classList.add('character');

	pCharacter.appendChild(character[p]);

	let characterUrl = 'images/characters/';  //folder to the images of characters

	character[p].src = characterUrl + characterList.find(x => x.characterName === player[p]).characterImage;

	gamecharacter[p].classList.add('gamecharacter');
	gamecharacter[p].classList.add('gamecharacter'+ p);

	gamecharacter[p].src = character[p].src;  //Game Character1 is the same as the character player1 selected 

	gameBoard.appendChild(gamecharacter[p]);   //Exectutes the game character with the correct image to the game board div. 
}

// keyboard
document.onkeydown = function (letter) {
	switch (letter.key) {
		case 'a':  
			if (playersTurn === 1) {
				rollDice(1);
			}

			break; 
		case 'l':  
			if (playersTurn === 2) {
				rollDice(2);
			}
	}
};


// adding event listener to buttons
document.getElementById("rollPlayer1").addEventListener("click", function(){
	if (playersTurn === 1) {
		rollDice(1);
	}
 });
 document.getElementById("rollPlayer2").addEventListener("click", function(){
	if (playersTurn === 2) {
		rollDice(2);
	}
 });

//Rolling of Dice - triggerd by keybord or button press
function rollDice(playerNR) {
	playersTurn	= 0; //anticheat - locking button and key triggering 
	let diceValue = Math.floor(Math.random() * 6) + 1; 	//random nr for dice 1-6
	console.log("player: " + playerNR + " Dice: " + diceValue)

	const diceBtn = document.querySelector('#rollPlayer' + playerNR);	//Buttn for rolling dice

	diceBtn.style.backgroundColor = 'gray';
	diceBtn.disabled = "disabled";
	diceBtn.style.cursor = 'not-allowed';

	diceAnimation(playerNR,diceValue)
	asyncCall(playerNR,diceValue,diceBtn);

}

function diceAnimation(playerNR,diceValue){

	var diceIcon = document.getElementById('diceimage' + playerNR);

	//Dice rolling animation
	setTimeout(function () { diceIcon.src = 'images/dice/2.png'; }, 100);
	setTimeout(function () { diceIcon.src = 'images/dice/3.png'; }, 200);
	setTimeout(function () { diceIcon.src = 'images/dice/4.png'; }, 300);
	setTimeout(function () { diceIcon.src = 'images/dice/1.png'; }, 400);
	setTimeout(function () { diceIcon.src = 'images/dice/2.png'; }, 500);
	setTimeout(function () { diceIcon.src = 'images/dice/3.png'; }, 600);
	setTimeout(function () { diceIcon.src = 'images/dice/5.png'; }, 700);

	//Show the dice value
	setTimeout(function () { switch (diceValue) {
		case 1:
			diceIcon.src = 'images/dice/1.png';
			break;

		case 2:
			diceIcon.src = 'images/dice/2.png';
			break;

		case 3:
			diceIcon.src = 'images/dice/3.png';
			break;

		case 4:
			diceIcon.src = 'images/dice/4.png';
			break;

		case 5:
			diceIcon.src = 'images/dice/5.png';
			break;

		case 6:
			diceIcon.src = 'images/dice/6.png';
			break;
	}}, 800);
}

async function asyncCall(playerNR,diceValue,diceBtn) {
	console.log('move');
	for (let i = 0; i < diceValue; i++) {
		(function () {
			setTimeout(function () {
				moveCharacter(playerNR);
			}, i * 500);
		})(i);
	}
	let result = await resolveUp(playerNR,diceValue,diceBtn);
	console.log(result);
}

//Movment across the map
function moveCharacter(playerNR) {
	
	var positionPlayer = document.querySelector('#positionPlayer' + playerNR);
	playerscore[playerNR]++;
	positionPlayer.innerHTML = playerscore[playerNR];

	if (playerscore[playerNR] >= 1 && playerscore[playerNR] <= 4) moveRight(playerNR);
	if (playerscore[playerNR] === 5) moveDown(playerNR);
	if (playerscore[playerNR] >= 6 && playerscore[playerNR] <= 9) moveLeft(playerNR); 
	if (playerscore[playerNR] === 10) moveDown(playerNR); 
	if (playerscore[playerNR] >= 11 && playerscore[playerNR] <= 14) moveRight(playerNR); 
	if (playerscore[playerNR] === 15) moveDown(playerNR); 
	if (playerscore[playerNR] >= 16 && playerscore[playerNR] <= 19) moveLeft(playerNR); 
	if (playerscore[playerNR] === 20) moveDown(playerNR);
	if (playerscore[playerNR] >= 21 && playerscore[playerNR] <= 24) moveRight(playerNR); 
	if (playerscore[playerNR] === 25) moveDown(playerNR); 
	if (playerscore[playerNR] >= 26 && playerscore[playerNR] <= 29) moveLeft(playerNR); 
	if (playerscore[playerNR] === 30) moveDown(playerNR); 
	if (playerscore[playerNR] >= 31 && playerscore[playerNR] <= 31) moveRight(playerNR); 
	checkResult(playerNR);
}

function resolveUp(playerNR,diceValue,diceBtn) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('stop');
			checkPlayersTurn(playerNR,diceValue);
			playerscore[playerNR] = playerscore[playerNR] - trappytrapp(playerNR,playerscore[playerNR])

		}, diceValue * 710);
	});
}


// Down movment
function moveDown(playerNR) {
	gamecharacter[playerNR].style.top = yPosition[playerNR] + 'px';
	yPosition[playerNR] += 160;
}
//Left movement
function moveLeft(playerNR) {
	xPosition[playerNR] -= 150;
	gamecharacter[playerNR].style.transform = 'translateX(' + xPosition[playerNR] + 'px)';
}
//Right movement
function moveRight(playerNR) {
	xPosition[playerNR] += 150;
	gamecharacter[playerNR].style.transform = 'translateX(' + xPosition[playerNR] + 'px)';
}

// Check for winner
function checkResult(playerNR) {
	if (playerscore[playerNR] === 31) {
		switch (playerNR) {
			case 1:
				window.localStorage.setItem('winner', player[1]);
				window.localStorage.setItem('winnerimg', character[1].src);
				break;
			
			case 2:
				window.localStorage.setItem('winner', player[2]);
				window.localStorage.setItem('winnerimg', character[2].src);
				break;
		
			default:
				break;
		}
		setTimeout(function(){
			document.getElementById("winner-page").click();
		}, 2000);
	}
}
//Check players turn. rolling a 6 gives a free turn
function checkPlayersTurn(playerNR,diceValue) {
	switch (playerNR) {
		case 1:
			if (diceValue === 6) { //if 6 is rolled, disable the second btn
				playersTurn = 1;				
				document.querySelector('#rollPlayer1').style.backgroundColor = '#F8CE44'; 
				document.querySelector('#rollPlayer1').disabled = "enable";
				document.querySelector('#rollPlayer1').style.cursor = 'pointer';
				document.querySelector('#rollPlayer2').style.cursor = 'not-allowed';
				document.querySelector('#rollPlayer2').style.backgroundColor = 'gray';
				hitSix()
			} else {
				playersTurn = 2;
				document.querySelector('#rollPlayer2').style.cursor = 'pointer';
				document.querySelector('#rollPlayer2').style.backgroundColor = '#F8CE44'; 
				document.querySelector('#rollPlayer1').style.backgroundColor = 'gray';
				document.querySelector('#rollPlayer1').disabled = "disabled";
				document.querySelector('#rollPlayer1').style.cursor = 'not-allowed';
			}
			break;

		case 2:
			if (diceValue === 6) { //if 6 is rolled, disable the second btn
				playersTurn = 2;
				document.querySelector('#rollPlayer1').style.backgroundColor = 'gray';
				document.querySelector('#rollPlayer1').style.cursor = 'not-allowed';			
				document.querySelector('#rollPlayer2').style.backgroundColor = '#F8CE44'; 
				document.querySelector('#rollPlayer2').disabled = "enable";
				document.querySelector('#rollPlayer2').style.cursor = 'pointer';
				hitSix()
			} else {
				playersTurn = 1;
				document.querySelector('#rollPlayer2').style.backgroundColor = 'gray';
				document.querySelector('#rollPlayer2').disabled = "disabled";
				document.querySelector('#rollPlayer2').style.cursor = 'not-allowed';
				document.querySelector('#rollPlayer1').style.backgroundColor = '#F8CE44';			
				document.querySelector('#rollPlayer1').style.cursor = 'pointer';
			}
			break;

		default:
			break;
	}
}

//Traps
function trappytrapp(playerNR, playerscore){

	switch (playerscore) {
		case 7: //trap tile 7
				xPosition[playerNR] += 300; // 2steps 
				gamecharacter[playerNR].style.transform = 'translateX(' + xPosition[playerNR] + 'px)';
				hitTrap(2,"The Night king is lucking...")
			return 2
			case 13://trap tile 13
				xPosition[playerNR] -= 450; //3 steps
				gamecharacter[playerNR].style.transform = 'translateX(' + xPosition[playerNR] + 'px)';
				hitTrap(3,"Ramsay Bolton is sending is dogs after you..")
			return 3
			case 17://trap tile 17
				xPosition[playerNR] += 300; //2 steps
				gamecharacter[playerNR].style.transform = 'translateX(' + xPosition[playerNR] + 'px)';
				hitTrap(2,"The frey's invited you to a wedding... run.. ")
			return 2
			case 24://trap tile 24
				xPosition[playerNR] -= 450; //3 steps
				gamecharacter[playerNR].style.transform = 'translateX(' + xPosition[playerNR] + 'px)';
				hitTrap(3,"That brat will send you through the moondoor..")
			return 3
			case 29://trap tile 29
				xPosition[playerNR] += 450; //3 steps
				gamecharacter[playerNR].style.transform = 'translateX(' + xPosition[playerNR] + 'px)';
				hitTrap(3,"The Greyjoy's are sailing near by...")
			return 3
		default:
			return 0;
	}

}


//game info text - for boost and traps
const gameinfoText1 = document.querySelector('.gameinfo-text1');
const gameinfoText2 = document.querySelector('.gameinfo-text2');
const gameinfoText3 = document.querySelector('.gameinfo-text3');
const gameinfo = document.querySelector('.gameinfo');
const gameinfoTextContainer = document.querySelector('.gameinfo-container');

function hitSix() {
	gameinfo.style.opacity = '1';
	gameinfoText1.innerHTML = 'THE THRONE IS CLOSER';
	gameinfoText2.innerHTML = 'You got a 6,';
	gameinfoText3.innerHTML = 'get another roll';
	gameinfoTextContainer.style.background = 'rgba(34, 53, 54, 0.363)';

	setTimeout(function(){
		gameinfo.style.opacity = '0';
		gameinfoText1.innerHTML = '';
		gameinfoText2.innerHTML = '';
		gameinfoText3.innerHTML = '';
		gameinfoTextContainer.style.background = 'transparent';
	}, 4400);
}
function hitTrap(backTile,traptext) {
	gameinfo.style.opacity = '1';
	gameinfoText1.innerHTML = traptext;
	gameinfoText2.innerHTML = 'You need to go back ' + backTile + ' tiles!';
	gameinfoTextContainer.style.background = 'rgba(34, 53, 54, 0.363)';
	//gameinfoTextContainer.style.color =  'rgb(77, 23, 23);';

	setTimeout(function(){
		gameinfo.style.opacity = '0';
		gameinfoText1.innerHTML = '';
		gameinfoText2.innerHTML = '';
		gameinfoTextContainer.style.background = 'transparent';

	}, 4400);
}

//lock player 2 button as default
document.querySelector('#rollPlayer2').style.backgroundColor = 'gray';
document.querySelector('#rollPlayer2').disabled = "disabled";
document.querySelector('#rollPlayer2').style.cursor = 'not-allowed';

//offset starting position player 2
gamecharacter[2].style.transform = 'translateX(' + xPosition[2] + 'px)';

// To winner page
const body = document.querySelector('body');
const winnerPage = document.createElement('a');
winnerPage.id = 'winner-page';
winnerPage.href = 'winner.html';

body.appendChild(winnerPage);