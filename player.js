class Player {
  constructor(order, gameHandler) {
    this.playerBoard = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    this.score = 0;
    this.color = null;
    this.order = order;
    this.gameHandler = gameHandler;

    this.clickHandler = this.clickHandler.bind(this);
    // this.isValid = this.isValid.bind(this);
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

  isValid (dice, pos) {
    // debugger;
    var row = parseInt(pos[0]);
    var column = parseInt(pos[1]);

    if (this.playerBoard[row][column] != 0) {
      return false;
    }

    if (row !== 0 && this.playerBoard[row-1][column] !== 0) {
      if (this.playerBoard[row-1][column].randomColor === dice.randomColor ||
          this.playerBoard[row-1][column].randomNumber === dice.randomNumber) {
        return false;
      }
    }
    if (row !== this.playerBoard.length-1 && this.playerBoard[row+1][column] !== 0) {
      if (this.playerBoard[row+1][column].randomColor === dice.randomColor ||
        this.playerBoard[row+1][column].randomNumber === dice.randomNumber) {
        return false;
      }
    }

    if (column !== 0 && this.playerBoard[row][column-1] !== 0) {
      if (this.playerBoard[row][column-1].randomColor === dice.randomColor ||
        this.playerBoard[row][column-1].randomNumber === dice.randomNumber) {
        return false;
      }
    }
    if (column !== this.playerBoard[row].length-1 && this.playerBoard[row][column+1] !== 0) {
      if (this.playerBoard[row][column+1].randomColor === dice.randomColor ||
        this.playerBoard[row][column+1].randomNumber === dice.randomNumber) {
        return false;
      }
    }

    this.playerBoard[row][column] = dice;
    return true;
  }

  // takes the clickedDice and checks if it can fit into board
  // If it can fit, check if the dice color matches player color
  // If matches, add score by the amount the dice value was
  playerScoreIncrement(die) {
    if (die.randomColor === this.color) {
      this.score += die.randomNumber;
    }
  }

}
