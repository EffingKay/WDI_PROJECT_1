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


$(parseBoard);

var currentWord = [];

// Generates a new word every x seconds
setInterval(randomWord, 2500);

// Creates a board with list items which will be populated with random words later
function parseBoard() {
  for (var i = 0; i < 25; i++) {
    $('.board').append('<li></li>');
  }
  $('form').on('submit', doesMatch);
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
  var $lisArray = $('.board').children();
  var randomNumber = (Math.floor(Math.random() * 24) + 1);
  if ($($lisArray[randomNumber]).html() === '') {
    $lisArray[randomNumber].append(word.Word);
    wordMove($lisArray[randomNumber]);
    currentWord.push(word.Word);
  }
  console.log($($lisArray[randomNumber]).html());
}


// Animates the word across board
function wordMove(word) {
  var $windowWidth = $(window).width() + 'px';
  $(word).animate({
    marginLeft: $windowWidth
  }, 20000, function(){
    if ($(word).text() !== '') {
      console.log('haha, you LOSE');
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
  } else {
    $('input').val('');
  }
}

// Function that removes li after typed
function removeListItem() {
  var $input = $('input').val();
  var index = currentWord.indexOf($input);
  var $lisArray = $('.board').children();
  if (index > -1) {
    currentWord.splice(index, 1);
    $($lisArray).each(function(i, elem) {
      if ($(elem).text() === $input) {
        $(elem).text('').finish().css('marginLeft', '0px');
        // $(elem).finish().css('marginLeft', '0');
        // $('.board').append('<li></li>');
      }
    });
  }
}
