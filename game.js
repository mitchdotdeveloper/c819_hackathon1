class Game {
  constructor() {
    this.roundCount = 0; // start at 0 if we have a set up phase. start at 1 if we're going right into it.
    this.playerList = [];
    this.currentPlayer = 0;
    this.playerScoreArray = [];
    this.dice = [];
  }
  startGame(players) {
    $('.round > .current-round').text(this.roundCount);
    $('#p1, #p2, #p3, #p4').addClass('avoid-clicks');
    this.createPlayers(players);
    this.playerTurnTracker();
    this.roundIncrement();
  }
  createPlayers(players) {
    for (var i = 0; i < players; i++) {
      //var playerScore =
      this.playerList.push(new Player(i));
      this.playerScoreArray.push(this.playerList[i].score);
    }
  }
  createDice(numberOfDice) {
    for (var i = 0; i < numberOfDice; i++) {
      this.dice.push(new Dice());
      this.dice[i].render();
    }
  }
  roundIncrement() {
    this.roundCount++;
    $('.round > .current-round').text(this.roundCount);
  }
  playerTurnTracker() {
    if (this.currentPlayer === 0) {
      $('#p1').removeClass('avoid-clicks');
      setTimeout(function() {
        this.currentPlayer++;

      }, 2000)
    }
  }
  endGame() {
    this.playerScoreArray.push(this.playerList[0]);
    this.playerScoreArray.push(this.playerList[1]);
    this.playerScoreArray.push(this.playerList[2]);
    this.playerScoreArray.push(this.playerList[3]);
    for (var i = 0; i < this.playerScoreArray.length; i++) {
      var temp = this.playerScoreArray[i];
      if (this.playerScoreArray[i] < this.playerScoreArray[i+1]) {
        this.playerScoreArray[i] = this.playerScoreArray[i+1];
        this.playerScoreArray[i+1] = temp;
      }
      var scoreDiv = $('<div>');
      scoreDiv.text()
    }
  }
}
