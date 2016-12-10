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


// things to do
// generate a word
// append that word to div at random position of top and left
// word needs to have position relative? absolute?
// set an animation - within that function set a function that checks position left to div width


$(init);

function init() {
  parseBoard();
  randomWord();
}

function parseBoard() {
  for (var i = 0; i < 20; i++) {
    $('.board').append('<li></li>');
  }
}

function randomWord() {
  var requestStr = 'http://randomword.setgetgo.com/get.php';
  $.ajax({
    type: 'GET',
    url: requestStr,
    dataType: 'jsonp',
    jsonpCallback: 'parseWord'
  });
}

function parseWord(word) {
  console.log(word.Word);
  var $lisArray = $('.board').children();
  var randomNumber = (Math.floor(Math.random() * 19) + 1);
  console.log($lisArray);
  $lisArray[randomNumber].append(word.Word);
}



// function start() {
//   // setInterval(function(){RandomWord();}, 2000);
//   RandomWord();
// }
//
// function RandomWord() {
//   var requestStr = 'http://randomword.setgetgo.com/get.php';
//
//   $.ajax({
//     type: 'GET',
//     url: requestStr,
//     dataType: 'jsonp',
//     jsonpCallback: 'RandomWordComplete'
//   });
// }
//
// function RandomWordComplete(data) {
//   var $board = $('.board');
//
//   console.log(data.Word);
//   if (data.Word.length > 5) {
//     $board.append(data.Word);
//   } else {
//     RandomWord();
//   }
// }
