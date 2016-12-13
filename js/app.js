// Typing game

// Words will appear on left hand side of the screen and slowly move to the right
// User needs to type the words on screen in order to clear them
// If any word reaches the right side, the player looses
// Score - the number of words cleared

// TODO
// Create div where the generated words will appear
// Create an input where user types the words
// Generate the words - use random words API
// start with 5 every second, add another every 5s - setInterval()
// When generated push the words into currentWords array
// If user's input matches any of the words in currentWords
// clear the word from the div
// increase Score
// clear input
// create function that moves the words to the right with time passing
// moving through the width of the parent - HOW????
// decreasing mergin-right by Xpx every Xs

// Game over
// when amrgin right is 0



// unnecessary features
// background color changes after every correct input?
// every incorrect input - the screen flashes red?


$(startGame);

var currentWord        = [];
var interval           = 1500;
var animationDuration  = 12000;
var score              = 0;
var highEasy           = 0;
var highNormal         = 0;
var highExtreme        = 0;
var currentLevel       = 'normal';


function startGame() {
  $('#normal').on('click', parseBoard);
  $('#easy').on('click', easyLevel);
  $('#extreme').on('click', extremeLevel);
}

// Creates a board with list items which will be populated with random words later
function parseBoard() {
  currentWord       = [];
  score             = 0;
  var currentScore  = '<h4 id="score">Score: 0</h4>';
  var highScore     = '<h4 id="highScore">High score: ' + parseHighScore(currentLevel) + '</h4>';
  var input         = '<input type="text" value="" placeholder="type here" autofocus="autofocus">';
  for (var i = 0; i < 20; i++) {
    // $('.board').append('<li></li>');
    $('.board').append('<div class="word"></div>');
  }
  $('.buttons').remove();
  $('.finalScore').remove();
  $('.youTried').remove();
  $('.main').prepend(highScore, currentScore);
  $('form').append(input).on('submit', doesMatch);
}

// Generates a new word every x seconds
setInterval(randomWord, interval);

// Generates a random word and parse it to unordered list
function randomWord() {
  var randomWordNumber = Math.floor(Math.random() * (window.words.length -1 )) + 1;
  parseWord(window.words[randomWordNumber]);
}

// Parse random word in a random list item and push it to currentWord array
function parseWord(word) {
  var $lisArray     = $('.board').children();
  var randomNumber  = (Math.floor(Math.random() * 19) + 1);
  if ($($lisArray[randomNumber]).html() === '') {
    $lisArray[randomNumber].append(word);
    wordMove($lisArray[randomNumber]);
    currentWord.push(word);
  }
}

// Animates the word across board
function wordMove(word) {
  var $windowWidth = $(window).width() + 'px';
  $(word).animate({
    marginLeft: $windowWidth
  }, animationDuration, function(){
    if ($(word).text() !== '') {
      gameOver();
    }
  });
}

// Check if the word submitted matched any word in a currentWord array
function doesMatch(e) {
  e.preventDefault();
  var typed = $('input').val();
  if ( currentWord.indexOf(typed) > -1 ) {
    removeListItem();
    $('input').val('');
    doesMatch;
    score++;
    $('#score').html('Score: ' + score);
    changeBackground();
  } else {
    $('input').val('');
  }
  decreaseInterval();
  saveTheCat();
}

// Function that removes li after typed
function removeListItem() {
  var $input    = $('input').val();
  var index     = currentWord.indexOf($input);
  var $lisArray = $('.board').children();
  if (index > -1) {
    currentWord.splice(index, 1);
    $($lisArray).each(function(i, elem) {
      if ($(elem).text() === $input) {
        $(elem).text('').finish().css('marginLeft', '0px');
      }
    });
  }
}


// decreasing interval and animation duration with progress
function decreaseInterval() {
  if (score % 3 === 0 && interval > 500) {
    interval -= 500;
  } else if (score % 5 === 0) {
    animationDuration -= 1000;
  }
}

// game over function
function gameOver() {
  $('.board').children().stop().remove();
  $('input').remove();
  $('#score').remove();
  $('#highScore').remove();
  if (currentLevel === 'easy') {
    highEasy = highestScore(score, highEasy);
  } else if (currentLevel === 'normal') {
    highNormal = highestScore(score, highNormal);
  } else {
    highExtreme = highestScore(score, highExtreme);
  }
  gameOverScreen();
}

// game over - lost
function gameOverScreen() {
  var youTried    = '<img src="http://vignette4.wikia.nocookie.net/degrassi/images/a/a8/You_tried.png/revision/latest?cb=20131018202400" class="youTried">';
  var youWon      = '<img src="https://sketchingwithhardware.files.wordpress.com/2014/04/grumpycat.png" class="youTried">';
  youWon          += '<h1>You won! Grumpy cat is now happy!</h1>';
  var finalScore  = '<h2 class="finalScore">Your score is: ';
  finalScore      += score + '<br>High score: ' + parseHighScore(currentLevel);
  finalScore      +='<br>Wanna play again?</h2>';
  var easy        = '<button type="button" name="button" id="easy">Grandma</button>';
  var normal      = '<button type="button" name="button" id="normal">Boring</button>';
  var extreme     = '<button type="button" name="button" id="extreme">Extreme</button>';
  var buttons     = '<div class="buttons">' + easy + normal + extreme + '</div>';

  $('.main').prepend(finalScore, buttons);
  if (score < 50) {
    $('.main').prepend(youTried);
  } else {
    $('.main').prepend(youWon);
  }
  $('input').remove();
  startGame();
}


// determine high score
function highestScore(score, highScore) {
  if (score > highScore) {
    return score;
  } else {
    return highScore;
  }
}

function parseHighScore(level) {
  if (level === 'easy') {
    return highEasy;
  } else if (level === 'normal') {
    return highNormal;
  } else {
    return highExtreme;
  }
}

function easyLevel() {
  interval           = 3000;
  animationDuration  = 17000;
  currentLevel       = 'easy';
  parseBoard();
}

function extremeLevel() {
  interval           = 5;
  animationDuration  = 7000;
  currentLevel       = 'extreme';
  parseBoard();
}


function changeBackground() {
  var randomColors = ['#FF1962', '#8EE0F2', '#FFB5CB', '#AFC97E', '#B84256', '#68EDCC', '#F4B8B2', '#F25959', '#D8E2DC', '#FFCAD4', '#FFE5D9'];
  var randomNumber = Math.floor(Math.random() * (randomColors.length-1)) + 1;
  $('body').css('backgroundColor', randomColors[randomNumber]);
}

function saveTheCat() {
  if (score > 0 && score % 10 === 0) {
    $('.cat').animate({
      marginLeft: '+=105px'
    }, 2000);
  } else if (score >= 50) {
    gameOver();
  }
}
