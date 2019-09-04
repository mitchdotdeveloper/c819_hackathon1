class Player {

  constructor(order) {
    this.playerBoard = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20]
    ];
    this.score = 0;
    this.color = null;
    this.order = order;
  }

  // future method to create board on DOM using jQuery
  createBoard() {

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

  playerScoreIncrement(dieProperties) {
    // if(this.color ===  )
  }

}
