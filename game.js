class Game {
  constructor() {
    this.roundCount = 0; // start at 0 if we have a set up phase. start at 1 if we're going right into it.
    this.playerList = [];
    this.currentPlayer = 0;
    this.dice = [];
    this.diceSelected = null;

    this.diceClicked = this.diceClicked.bind(this);
    this.playerBlockClicked = this.playerBlockClicked.bind(this);
  }

  startGame(players) {
    $('.round > .current-round').text(this.roundCount);
    $('#p0, #p1, #p2, #p3').addClass('avoid-clicks');
    this.createPlayers(players);
    this.createDice(9);
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

  diceClicked (diceObject) {
    this.diceSelected = diceObject;
  }

  playerBlockClicked(playerBlockElement) {
    if (this.diceSelected !== null) {
      var position = $(playerBlockElement.currentTarget).text().split(',');
      console.log(position);

      // if (this.playerList[this.currentPlayer].isValidMove(this.diceSelected, position) ) {
      //   this.diceSelected.singleDieDomElement.hide();
      // }
    }

    this.diceSelected = null;
  }

  roundIncrement() {
    this.roundCount++;
    $('.round > .current-round').text(this.roundCount);
    this.dice = [];
    this.createDice(9);
  }
  loopPlayers() {
    for (var i = 0; i < this.playerList.length; i++) {
      this.playerTurnTracker(i);
    }
  }
  playerTurnTracker(index) {
    if (this.currentPlayer === '#p' + index) {
      $('#p' + index).removeClass('avoid-clicks');
      setTimeout(function() {
        this.currentPlayer++;

      }, 30000)
    }
  }
  endGame() {
    for (var i = 0; i < this.playerList.length; i++) {
      var temp = this.playerList[i];
      if (this.playerList[i].score < this.playerList[i+1].score) {
        this.playerList[i] = this.playerList[i+1];
        this.playerList[i+1] = temp;
      }
      var scoreDiv = $('<div>');
      scoreDiv.text()
    }
  }
}
