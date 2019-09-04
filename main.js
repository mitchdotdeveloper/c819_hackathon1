$(document).ready(initializeApp);
var game;
function initializeApp () {
  game = new Game();
  game.startGame(4);
}
