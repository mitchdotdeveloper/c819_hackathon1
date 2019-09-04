class Game {
  constructor() {
    this.roundCount = 0; // start at 0 if we have a set up phase. start at 1 if we're going right into it.
    this.playerList = [];
    this.player1Score = null;
    this.player2Score = null;
    this.player3Score = null;
    this.player4Score = null;
    this.playerTurn = null;
    this.playerScoreRoundUp = [];
  }
  startGame(players) {
    $('.round > .current-round').text(this.roundCount);
    for (var i = 0; i < players; i++) {
      this.playerList.push(new Player(i));
    }
    this.playerTurnTracker();
    this.roundIncrement();
  }
  roundIncrement() {
    this.roundCount++;
    $('.round > .current-round').text(this.roundCount);
  }
  // playerScoreIncrement(player, color, dieValue) {
  //   if (this.dice.color === this.player.dice.color) {
  //     this.playerScore += dieValue;
  //   }
  // }
  playerTurnTracker(index) {
    this.playerTurn = index;
    if (this.playerTurn === this.playerList[index]) {
      $('#p2, #p3, #p4').addClass('avoid-clicks');
      setTimeout(function() {
        index++;

      }, 2000)
    }
  }
  endGame(playerScoreArray) {
    this.playerScoreRoundUp.push(this.playerList[0]);
    this.playerScoreRoundUp.push(this.playerList[1]);
    this.playerScoreRoundUp.push(this.playerList[2]);
    this.playerScoreRoundUp.push(this.playerList[3]);
    var playerScoreArray = this.playerScoreRoundUp;
    for (var i = 0; i < playerScoreArray.length; i++) {
      var temp = playerScoreArray[i];
      if (playerScoreArray[i] < playerScoreArray[i+1]) {
        playerScoreArray[i] = playerScoreArray[i+1];
        playerScoreArray[i+1] = temp;
      }
      var scoreDiv = $('<div>');
      scoreDiv.text()
    }
  }
}
