class Dice {
  constructor(gameHandler){
    this.diceColorArray = ["blue", "yellow", "green", "purple", "red"];
    this.randomNumber = 0;
    this.randomColor = null;
    this.face = '';
    this.singleDieDomElement = null;
    this.currentDieValues = {
      "number": 0,
      "color": "",
      "face" : ''
    };
    this.gameHandler = gameHandler;
    this.clickHandler = this.clickHandler.bind(this);
  }
  setRandomNumber() {
    this.randomNumber = Math.floor(Math.random()*6 + 1);
    this.face = 'images/' + this.randomNumber + '.png';
  }
  setRandomColor() {
    this.randomColor = this.diceColorArray[Math.floor(Math.random()*this.diceColorArray.length)];
  }
  render(){
    this.singleDieDomElement = $("<div>").addClass("dice-block").text(this.randomNumber+this.randomColor);
    var dieFace = $('<img>').attr('src', this.face);
    this.singleDieDomElement.append(dieFace);
    this.singleDieDomElement.on('click', this.clickHandler);
    $(".dice-container").append(this.singleDieDomElement);
  }
  getDiceInfo() {
      this.currentDieValues.number = this.randomNumber;
      this.currentDieValues.color = this.randomColor
      this.currentDieValues.face = this.face;
      return this.currentDieValues;
  }
  clickHandler () {
    this.gameHandler(this);
  }
}
