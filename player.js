class Player {
  constructor(order, gameHandler) {
    this.playerBoard = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20]
    ];
    this.score = 0;
    this.color = null;
    this.order = order;
    this.gameHandler = gameHandler;

    this.clickHandler = this.clickHandler.bind(this);
  }

  // future method to create board on DOM using jQuery
  createBoard() {
    var board = $('<div>').addClass('player-board').attr('id', 'p'+this.order);
    for (var row = 0; row < 4; ++row) {
      for (var column = 0; column < 5; ++column) {
        var block = $('<div>').addClass('board-block').text(row+','+column);
        block.on('click', this.clickHandler);
        board.append(block);
        $('.dice-container').after(board);
      }
    }
  }

  clickHandler (event) {
    this.gameHandler(event);
  }

  randomColor() {
    var colorArray = ["blue","red","green","purple","yellow"];
    this.color = colorArray[this.order];
  }

  getPlayerColor() {
    return this.color;
  }

  storeClickedDice() {

  }

  // takes the clickedDice and checks if it can fit into board
  // If it can fit, check if the dice color matches player color
  // If matches, add score by the amount the dice value was
  playerScoreIncrement(die) {

  }

}
