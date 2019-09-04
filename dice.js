class Dice {
  constructor(diceCount){
    this.dieSides = [1, 2, 3, 4, 5, 6];
    this.diceColorArray = ["blue", "yellow", "green", "purple", "red"];
    this.randomNumber = 0;
    this.randomColor = null;
    this.diceCount = diceCount;
    this.singleDieDomElement = null;
    this.currentDieValues = {
      "number": 0,
      "color": ""
    };
  }
  givesRandomNumber() {
    this.randomNumber = this.dieSides[Math.floor(Math.random()*6 + 1)];
    return this.randomNumber;
  }
  givesRandomColor() {
    this.randomColor = this.diceColorArray[Math.floor(Math.random()*this.diceColorArray.length)];
    return this.randomColor;
  }
  render(){
    // this.allDiceDomElement = $("<div>").addClass("diceDiv");
  }
  getDiceInfo() {
      this.currentDieValues.number = this.givesRandomNumber();
      this.currentDieValues.color = this.givesRandomColor();
      return this.currentDieValues;
  }
  rollDice() {
  }
}
