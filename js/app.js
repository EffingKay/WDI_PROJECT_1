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
var interval           = 2500;
var animationDuration  = 15000;
var score              = 0;

function startGame() {
  $('#normal').on('click', parseBoard);
  $('#easy').on('click', easyLevel);
  $('#hard').on('click', extremeLevel);
}

// Generates a new word every x seconds
setInterval(randomWord, interval);

// Creates a board with list items which will be populated with random words later
function parseBoard() {
  var currentScore  = '<h4 id="score">Score: 0</h4>';
  var input         = '<input type="text" value="" placeholder="type here" autofocus>';
  for (var i = 0; i < 25; i++) {
    $('.board').append('<li></li>');
  }
  $('.buttons').remove();
  $('.main').prepend(currentScore);
  $('form').append(input);
  $('form').on('submit', doesMatch);
  console.log(interval, animationDuration);
}

// Generates a random word and parse it to unordered list
function randomWord() {
  var requestStr = 'http://randomword.setgetgo.com/get.php';
  $.ajax({
    type: 'GET',
    url: requestStr,
    dataType: 'jsonp',
    jsonpCallback: 'parseWord'
  });
}

// Parse random word in a random list item and push it to currentWord array
function parseWord(word) {
  var $lisArray     = $('.board').children();
  var randomNumber  = (Math.floor(Math.random() * 24) + 1);
  if ($($lisArray[randomNumber]).html() === '') {
    $lisArray[randomNumber].append(word.Word);
    wordMove($lisArray[randomNumber]);
    currentWord.push(word.Word);
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
  } else {
    $('input').val('');
  }
  decreaseInterval();
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
    console.log('Interval: ' + interval);
  } else if (score % 5 === 0) {
    animationDuration -= 1000;
    console.log('anim duration: ' + animationDuration);
  }
}

// game over function
function gameOver() {
  $('.board').children().stop().remove();
  $('input').remove();
  $('#score').remove();
  gameOverScreen();
}

function gameOverScreen() {
  var newGameButton = '<button id="newGame">Wanna play again?</button>';
  var finalScore    = '<p class="finalScore">Your score is: ' + score + '</p>';
  $('.board').prepend(finalScore);
  $('.board').append(newGameButton);
  $('#newGame').on('click', function(){
    $('#newGame').remove();
    $('.finalScore').remove();
    parseBoard();
  });
}


function easyLevel() {
  currentWord        = [];
  interval           = 4000;
  animationDuration  = 20000;
  score              = 0;
  parseBoard();
}

function extremeLevel() {
  currentWord        = [];
  interval           = 200;
  animationDuration  = 7500;
  score              = 0;
  parseBoard();
}
