class Dice {
  constructor(gameHandler){
    this.diceColorArray = ["blue", "yellow", "green", "purple", "red"];
    this.randomNumber = 0;
    this.randomColor = null;
    this.singleDieDomElement = null;
    this.currentDieValues = {
      "number": 0,
      "color": ""
    };
    this.gameHandler = gameHandler;
    this.clickHandler = this.clickHandler.bind(this);
  }
  setRandomNumber() {
    this.randomNumber = Math.floor(Math.random()*6 + 1);
  }
  setRandomColor() {
    this.randomColor = this.diceColorArray[Math.floor(Math.random()*this.diceColorArray.length)];
  }
  render(){
    this.singleDieDomElement = $("<div>").addClass("dice-block").text(this.randomNumber+this.randomColor);
    $(this.singleDieDomElement).on('click', this.clickHandler);
    $(".dice-container").append(this.singleDieDomElement);
  }
  getDiceInfo() {
      this.currentDieValues.number = this.givesRandomNumber();
      this.currentDieValues.color = this.givesRandomColor();
      return this.currentDieValues;
  }
  clickHandler () {
    this.gameHandler(this);
  }
}
