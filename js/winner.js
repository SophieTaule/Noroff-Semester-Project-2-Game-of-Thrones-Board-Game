
//--- Header - color fade ---
const header = document.querySelector(".winner-header") //append to div
const winnerHeader = header.textContent;
const splitHeader = winnerHeader.split(""); // splits to array
header.textContent ="";    //removes the h1 header 

for (let i=0; i < splitHeader.length; i++) { 
    header.innerHTML += "<span>" + splitHeader[i] + "</span>"; //adds span between the new classes, (letters)
}

let letter = 0;
let timer = setInterval(colorFade, 70); //speed of transition 


function colorFade() {
    const span = header.querySelectorAll('span')[letter];
    span.classList.add('fade'); //css class
    letter++
    if(letter === splitHeader.length){
        complete();
        return;
    }
}
//stops after array is ended
function complete() {
    clearInterval(timer);
    timer = null;
}
// the colors can be changed in the css file under span



// --- Firefly ----

// Firefly Canvas 
let c = init("canvas"),
  w = (canvas.width = window.innerWidth),
  h = (canvas.height = window.innerHeight);


//creating fireflyes
class firefly{
  constructor(){
    this.x = Math.random()*w;
    this.y = Math.random()*h; 
    this.size = Math.random()*3; //size 
    this.angle = Math.random()*0.6*Math.PI; //angle spawn
    this.speed = this.size*this.size/4; //speed 
  }
  //movment
  move(){
    this.x += this.speed*Math.cos(this.angle);
    this.y += this.speed*Math.sin(this.angle);
    this.angle += Math.random()*50*Math.PI/200*Math.PI/200; //direction movment
  }
  //visibilty style
  show(){
    c.beginPath();
    c.arc(this.x,this.y,this.size,0,9*Math.PI); 
    c.fillStyle="#F8CE44";  // color of fireflyes
    c.fill();
  }
}

let f = [];

function draw() {
  if(f.length < 300){ //amount of fireflyes
    for(let j = 0; j < 10; j++){ // densety
     f.push(new firefly());
  }
     }
  //animation
  for(let i = 0; i < f.length; i++){
    f[i].move();
    f[i].show();
    if(f[i].x < 0 || f[i].x > w || f[i].y < 0 || f[i].y > h){
       f.splice(i,1);
       }
  }
}
//attach to html file
function init(canvasid) {
  let canvas = document.getElementById(canvasid),
    c = canvas.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);
  c.fillStyle = "#000000";
  c.fillRect(0, 0, w, h);
  return c;
}

//tells browser we want to perform animation 
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback);
    }
  );
});

function loop() {
  window.requestAnimFrame(loop);
  c.clearRect(0, 0, w, h);
  draw();
}

//uses the size of window
window.addEventListener("resize", function() {
  (w = canvas.width = window.innerWidth),
  (h = canvas.height = window.innerHeight);
  loop();
});

loop();
setInterval(loop, 1000 / 60);




// --- Shows Winner ---

//Brings winner character forward to the page
document.getElementById('winnerimg').src = window.localStorage.getItem('winnerimg');
document.getElementById('winnername').textContent  = window.localStorage.getItem('winner');