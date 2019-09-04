class Game {
  constructor() {
    this.roundCount = 0; // start at 0 if we have a set up phase. start at 1 if we're going right into it.
    this.playerList = [];
    this.currentPlayer = 0;
    this.dice = [];
  }

  startGame(players) {
    $('.round > .current-round').text(this.roundCount);
    $('#p1, #p2, #p3, #p4').addClass('avoid-clicks');
    this.createPlayers(players);
    this.createDice(9);
    this.roundIncrement();
  }
  createPlayers(players) {
    for (var i = 0; i < players; i++) {
      this.playerList.push(new Player(i));
    }
  }
  createDice(numberOfDice) {
    for (var i = 0; i < numberOfDice; i++) {
      this.dice.push(new Dice());
      this.dice[i].setRandomNumber();
      this.dice[i].setRandomColor();
      //this.dice[i].render();
    }
  }
  roundIncrement() {
    this.roundCount++;
    $('.round > .current-round').text(this.roundCount);
    this.dice = [];
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
