class Dice {
  constructor(diceCount){
    this.dieSides = [1, 2, 3, 4, 5, 6];
    this.diceColorArray = ["blue", "yellow", "green", "purple", "red"];
    this.randomNumber = 0;
    this.randomColor = null;
    this.diceCount = diceCount;
    this.allDiceDomElement = null;
    this.currentDiceValues = {
      "number": 0,
      "color": ""
    };
  }
  givesRandomNumber() {
    this.randomNumber = this.dieSides[Math.random(Math.floor()*6 + 1)];
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
      this.currentDiceValues.number = this.givesRandomNumber();
      this.currentDiceValues.color = this.givesRandomColor();
      return this.currentDiceValues;
    // return {color : this.randomColor, value : this.randomNumber};
  }
  rollDice() {
  }
}
// var a = new Dice();
