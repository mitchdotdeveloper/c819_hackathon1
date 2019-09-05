class Game {
  constructor() {
    this.roundCount = 0; // start at 0 if we have a set up phase. start at 1 if we're going right into it.
    this.playerList = [];
    this.currentPlayer = 0;
    this.dice = [];
    this.diceSelected = null;
    this.playerOrder = true;
    this.diceClicked = this.diceClicked.bind(this);
    this.playerBlockClicked = this.playerBlockClicked.bind(this);
  }
  startGame(players) {
    $('.round > .current-round').text('Round ' + this.roundCount);
    this.createPlayers(players);
    // $('#p0, #p1, #p2, #p3').addClass('avoid-clicks');
     this.roundIncrement();
  }
  createPlayers(players) {
    for (var i = 0; i < players; i++) {
      this.playerList.push(new Player(i, this.playerBlockClicked));
      this.playerList[i].createBoard();
    }
  }
  createDice(numberOfDice) {
    for (var i = 0; i < numberOfDice; i++) {
      this.dice.push(new Dice(this.diceClicked));
      this.dice[i].setRandomNumber();
      this.dice[i].setRandomColor();
      this.dice[i].render();
    }
  }

  diceClicked(diceObject) {
    this.diceSelected = diceObject;
    var newDiv = $('<div>').addClass('die')
    $('.player-board').append()
  }

  playerBlockClicked(playerBlockElement) {
    if (this.diceSelected !== null) {
      var position = $(playerBlockElement.currentTarget).text().split(',');
      var boardTarget = $(playerBlockElement.currentTarget);
      console.log(position);

      if (true) {//if (this.playerList[this.currentPlayer].isValidMove(this.diceSelected, position) ) {
        this.diceSelected.singleDieDomElement.hide();
        boardTarget.css({
          'background-image': 'url(' + this.diceSelected.face +')',
          'background-color': this.diceSelected.randomColor
        });
        boardTarget.text(this.diceSelected.randomNumber);
        } else {
        console.log('invalid move');
        return;
      }
    }

    this.diceSelected = null;
  }

  roundIncrement() {
    this.roundCount++;
    $('.dice-container').empty();
    $('.round > .current-round').text('Round ' + this.roundCount);
    this.dice = [];
    this.createDice(9);
    this.currentPlayer = 0;
    this.diceSelected = null;
    this.playerOrder = true;
    this.playerTurnTracker();
  }
  playerTurnTracker() {
    $('#p0, #p1, #p2, #p3').addClass('avoid-clicks');
    if (this.currentPlayer === 4) {
      this.playerOrder = false;
    }
    if (!this.playerOrder) {
      this.currentPlayer--;
      $('#p' + this.currentPlayer).removeClass('avoid-clicks');
      if (this.currentPlayer === 0) {
        this.playerOrder = true;
        if (this.roundCount === 10) {
          this.endGame();
        } else {
          this.roundIncrement();
        }
      }
    } else {
      $('#p' + this.currentPlayer).removeClass('avoid-clicks');
      this.currentPlayer++;
    }
  }
  endGame() {

    this.playerList.sort(function (a, b) {
      return b.score - a.score;
    });
    console.log(this.playerList);

    // Create modal showing all scores
  }
}
