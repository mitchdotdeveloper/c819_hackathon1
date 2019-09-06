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
  }

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

  randomColor(arr) {
    this.color = arr.pop();
  }

  getPlayerColor() {
    return this.color;
  }

  isValid (dice, pos) {
    var row = parseInt(pos[0]);
    var column = parseInt(pos[1]);
    var firstMove = true;
    var hasNeighbor = false;

    for (var rowIndex = 0; rowIndex < this.playerBoard.length; ++rowIndex) {
      for (var columnIndex = 0; columnIndex < this.playerBoard[rowIndex].length; ++columnIndex) {
        if (this.playerBoard[rowIndex][columnIndex] !== 0) {
          firstMove = false;
          break;
        }
      }
      if (!firstMove) {
        break;
      }
    }

    if (firstMove) {
      if ( (row !== 0 && row !== this.playerBoard.length-1) &&
           (column !== 0 && column !== this.playerBoard[row].length-1) ) {
        return false;
      }
    }

    if (this.playerBoard[row][column] !== 0) {
      return false;
    }

    if (row !== 0 && this.playerBoard[row-1][column] !== 0) {
      if (this.playerBoard[row-1][column].randomColor === dice.randomColor ||
          this.playerBoard[row-1][column].randomNumber === dice.randomNumber) {
        return false;
      }
      hasNeighbor = true;
    }
    if (row !== this.playerBoard.length-1 && this.playerBoard[row+1][column] !== 0) {
      if (this.playerBoard[row+1][column].randomColor === dice.randomColor ||
        this.playerBoard[row+1][column].randomNumber === dice.randomNumber) {
        return false;
      }
      hasNeighbor = true;
    }

    if (column !== 0 && this.playerBoard[row][column-1] !== 0) {
      if (this.playerBoard[row][column-1].randomColor === dice.randomColor ||
        this.playerBoard[row][column-1].randomNumber === dice.randomNumber) {
        return false;
      }
      hasNeighbor = true;
    }
    if (column !== this.playerBoard[row].length-1 && this.playerBoard[row][column+1] !== 0) {
      if (this.playerBoard[row][column+1].randomColor === dice.randomColor ||
        this.playerBoard[row][column+1].randomNumber === dice.randomNumber) {
        return false;
      }
      hasNeighbor = true;
    }

    if (!hasNeighbor) {
      if ( (row !== 0 && column !== 0) && (this.playerBoard[row-1][column-1] !== 0)) {
        hasNeighbor = true;
      }
      if ((row !== 0 && column !== this.playerBoard[row].length-1) && (this.playerBoard[row-1][column+1] !== 0)) {
        hasNeighbor = true;
      }

      if ((row !== this.playerBoard.length-1 && column !== 0) && (this.playerBoard[row+1][column-1] !== 0)) {
        hasNeighbor = true;
      }
      if ((row !== this.playerBoard.length-1 && column !== this.playerBoard[row].length-1) && (this.playerBoard[row+1][column+1] !== 0)) {
        hasNeighbor = true;
      }
    }

    if (!hasNeighbor && !firstMove) {
      return false;
    }

    this.playerBoard[row][column] = dice;
    return true;
  }
  playerScoreIncrement(die) {
    if (die.randomColor === this.color) {
      this.score += die.randomNumber;
    }
  }
}
