// TODO
// Create div where the generated words will appear
// Create an input where user types the words
// Generate the words
// start with x every second, add another every x s - setInterval()
// When generated push the words into currentWords array
// If user's input matches any of the words in currentWords
// clear the word from the div
// increase Score
// clear input
// create function that moves the words to the right with time passing

// Game over
// when amrgin right is 0

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
  var input         = '<input type="text" value="" class="typehere" autofocus="autofocus">';
  for (var i = 0; i < 20; i++) {
    $('.board').append('<div class="word"></div>');
  }
  $('.buttons').remove();
  $('.finalScore').remove();
  $('.youTried').remove();
  $('.main').prepend(highScore, currentScore);
  $('form').append(input).on('submit', doesMatch);
  $('.typehere').focus();
}

// Generates a new word every x seconds
setInterval(randomWord, interval);

// Generates a random word and parse it to unordered list
function randomWord() {
  var randomWordNumber = (Math.floor(Math.random() * (window.words.length -1 )) + 1);
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
    playSound('correct');
    score++;
    $('#score').html('Score: ' + score);
    changeBackground();
    $('input').effect('highlight');
  } else if ( currentWord.indexOf(typed) === -1) {
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
  playSound('gameOver');
}

// game over - lost
function gameOverScreen() {
  var finalScore  = '<h2 class="finalScore">Your score is: ';
  finalScore      += score + '<br>High score: ' + parseHighScore(currentLevel);
  finalScore      +='<br>Wanna play again?</h2>';
  var easy        = '<button type="button" name="button" id="easy">Grandma</button>';
  var normal      = '<button type="button" name="button" id="normal">Boring</button>';
  var extreme     = '<button type="button" name="button" id="extreme">Extreme</button>';
  var buttons     = '<div class="buttons">' + easy + normal + extreme + '</div>';
  $('.main').prepend(finalScore, buttons);
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
  var randomColors = ['#FF1962', '#8EE0F2', '#F5BB00', '#18A346', '#2EC4B6', '#8EA604',
                      '#B84256', '#68EDCC', '#F16146', '#F25959', '#0EAD69', '#FF4E00',
                      '#FF3338', '#00ACAE', '#FFFF5D', '#0090C9', '#EC9F05', '#EE4266'];
  var randomNumber = Math.floor(Math.random() * (randomColors.length-1)) + 1;
  $('body').css('backgroundColor', randomColors[randomNumber]);
}

function playSound(event) {
  var eventSource;
  if (event === 'correct') {
    eventSource = './sounds/gong.mp3';
  } else if (event === 'gameOver') {
    eventSource = './sounds/gameOver.mp3';
  }
  var audio = new Audio;
  $('body').append(audio);
  audio.src = eventSource;
  audio.play();
}
