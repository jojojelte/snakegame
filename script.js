var startsound = new Audio("start.wav")
startsound.volume = 0.5;

var eatsound = new Audio("eat.wav")
eatsound.volume = 0.5;

var playSound = true

var colorInput = document.getElementById("color")
var defaultColor = "#000000"

var appleCount = 0
var highScore = 0
var score = document.getElementById("score")
var high = document.getElementById("highscore")
var highDiv = document.getElementById("high")

// COOKIE CHECKER

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toGMTString();
  console.log("Highscore cookie will expire at: " + expires)
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let score = getCookie("highscore");
  if (score != "") {
    highScore = score
    high.innerHTML = score
  }
}

window.onload = checkCookie()

window.addEventListener("load", startup, false);
function startup(){
  colorInput.value = defaultColor;
  colorInput.addEventListener("input", updateFirst, false);
  colorInput.addEventListener("change", updateAll, false);
  colorInput.select(); 
}

function updateFirst(event) {
  defaultColor = event.target.value;
}
function updateAll(event){
  defaultColor = event.target.value;
}

var cookiesdiv = document.getElementById("usescookies");
window.onload = setTimeout(() => {
  cookiesdiv.style.display = "block"
  cookiesdiv.style.animation = "pop-up 2s ease"
}, 700);

function closecookies(){
  var cookiesdiv = document.getElementById("usescookies");
  cookiesdiv.style.animation = "button-fade-out 1.2s ease"
  setTimeout(() => {
    cookiesdiv.style.display = "none"
  }, 1200);
}

function sound() {
  if (playSound == true){
    playSound = false
    console.log(playSound)
    document.getElementById("soundonbtn").style.display = "none"
    document.getElementById("soundoffbtn").style.display = "block"
  }

  else if (playSound == false){
    playSound = true
    console.log(playSound)
    document.getElementById("soundoffbtn").style.display = "none"
    document.getElementById("soundonbtn").style.display = "block"
  }
}

function changeColor() {
    var cTime = document.getElementById("cTime")

    cTime.style.webkitTextStroke = "15px rgb(59, 156, 83)"
    setTimeout(() => {
        cTime.style.webkitTextStroke = "15px rgb(204, 144, 53)"
    }, 1000);

    setTimeout(() => {
        cTime.style.webkitTextStroke = "15px rgb(196, 85, 66)"
    }, 2000);
    
}

function stopgame() {
  location.reload()
}

function start() {
  setTimeout(() => {
    b.style.display = "none";
  }, 1300);
  var c = document.getElementById("game")
  var b = document.getElementById("button")
  var cTime = document.getElementById("cTime")
  var Starting = document.getElementById("Starting")
  var c2 = document.getElementById("c2")
  var c1 = document.getElementById("c1")
  var picker = document.getElementById("cpick")
  var wtext = document.getElementById("head")
  var stop = document.getElementById("stop")

  picker.style.display = "none"
  wtext.style.display = "none"

  if (playSound == true){
  setTimeout(() => {
    startsound.play();
  }, 500);
  setTimeout(() => {
    startsound.volume = 0.2;
  }, 3780);
}


var timeleft = 3;
var Timer = setInterval(function(){
    if(timeleft <= 0) {
        clearInterval(Timer);
        cTime.style.display = "none"
        c.style.display = "block";
        stop.style.display = "block"
        score.style.display = "flex"
        highDiv.style.display = "flex"
        highDiv.style.marginBottom = "70vh"
    } else {
        Starting.style.display = "none"
        cTime.style.display = "block";
        highDiv.style.display = "none"
        changeColor()
        cTime.innerHTML = timeleft;
    }
    timeleft -= 1;
    }, 1000)
/*
    setTimeout(function(){
    c3.style.display = "none";
    c2.style.display = "block";
    }, 1000);

    setTimeout(function(){
    c2.style.display = "none";
    c1.style.display = "block";
    }, 1000);
            
    setTimeout(function(){
    c1.style.display = "none";
    c.style.display = "block";
    }, 1000);
*/
}


var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;
  
var snake = {
  x: 160,
  y: 160,
  
  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: grid,
  dy: 0,
  
  // keep track of all grids the snake body occupies
  cells: [],
  
  // length of the snake. grows when eating an apple
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};

// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {
  requestAnimationFrame(loop);

  // slow game loop to 15 fps instead of 60 (60/15 = 4)
  if (++count < 5.5) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // move snake by it's velocity
  snake.x += snake.dx;
  snake.y += snake.dy;

  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  
  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});

  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // draw apple
  context.fillStyle = "#F24646";
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  // draw snake one cell at a time
  context.fillStyle = defaultColor;
  context.strokeStyle = "#ffffff"
  context.lineWidth = 1.5;

  snake.cells.forEach(function(cell, index) {
    
    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.x, cell.y, grid-2, grid-2);  
    context.strokeRect(cell.x, cell.y, grid-2, grid-2);

    // snake ate apple
    var scoreboard = document.getElementById("scoreboard")
    var atext = document.getElementById("scoretext2")
    let score = getCookie("highscore");

    if (cell.x === apple.x && cell.y === apple.y) {
      if (playSound == true){
      eatsound.play() }
      snake.maxCells++;
      appleCount += 1
      if(appleCount > highScore){
        highScore = appleCount
        high.innerHTML = highScore
      }
      scoreboard.innerHTML = appleCount
      if (highScore != 0 && highScore >= 1) {
        setCookie("highscore", highScore, 365);
      }

      // canvas is 400x400 which is 25x25 grids 
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {
      
      // snake occupies same space as a body part. reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        appleCount = 0
        scoreboard.innerHTML = appleCount
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
  // prevent snake from backtracking on itself by checking that it's 
  // not already moving on the same axis (pressing left while moving
  // left won't do anything, and pressing right while moving left
  // shouldn't let you collide with your own body)
  
  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// start the game
requestAnimationFrame(loop);
