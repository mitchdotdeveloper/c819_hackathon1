class Game {
  constructor() {
    this.roundCount = 0; // start at 0 if we have a set up phase. start at 1 if we're going right into it.
    this.playerList = [];
    this.currentPlayer = 0;
    this.dice = [];
    this.diceSelected = null;
    this.diceElement = null;
    this.playerOrder = true;
    this.diceClicked = this.diceClicked.bind(this);
    this.playerBlockClicked = this.playerBlockClicked.bind(this);
    this.turnsCompleted = 0;
    this.playerColorArray = ['blue', 'red', 'green', '#f7be16', 'purple'];
  }
  startGame(players) {
    $('.round > .current-round').text('Round ' + this.roundCount);
    this.shuffleColors(this.playerColorArray);
    this.createPlayers(players);
    this.roundIncrement();
    $('.pass').click(this.pass.bind(this));
  }
  pickRandomColor(arr) {
    var randomColor = arr.pop();
    return randomColor;
  }
  createPlayers(players) {
    for (var i = 0; i < players; i++) {
      this.playerList.push(new Player(i, this.playerBlockClicked));
      this.playerList[i].randomColor(this.playerColorArray);
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

  diceClicked(diceObject,diceElement) {
    console.log(this.diceSelected);
    if(this.diceElement != null) {
      $(this.diceElement.currentTarget).removeClass("show-border");
    }
    this.diceSelected = diceObject;
    this.diceElement = diceElement;
    $(this.diceElement.currentTarget).addClass("show-border");
  }

  playerBlockClicked(playerBlockElement) {
    if (this.diceSelected !== null) {
      var position = $(playerBlockElement.currentTarget).text().split(',');
      var boardTarget = $(playerBlockElement.currentTarget);

      if (this.playerList[this.currentPlayer].isValid(this.diceSelected, position) ) {
        this.diceSelected.singleDieDomElement.hide();
        this.playerList[this.currentPlayer].playerScoreIncrement(this.diceSelected);
        boardTarget.css({
          'background-image': 'url(' + this.diceSelected.face +')',
          'background-color': this.diceSelected.randomColor
        });
        boardTarget.text(this.diceSelected.randomNumber);
        this.playerTurnTracker();
        } else {
          console.log('invalid move');
          return;
        }
    }

    this.diceSelected = null;
  }

  shuffleColors(arr) {
    var currentIndex = arr.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    console.log(arr);
    return arr;
  }
  roundIncrement() {
    this.roundCount++;
    $('.dice-container').empty();
    $('.round > .current-round').text('Round ' + this.roundCount);
    this.dice = [];
    this.createDice(9);
    this.currentPlayer = -1;
    this.diceSelected = null;
    this.playerOrder = true;
    this.turnsCompleted = 0;
    this.playerTurnTracker();
  }
  playerTurnTracker() {
    $('#p0, #p1, #p2, #p3').addClass('avoid-clicks');
    $('#p0, #p1, #p2, #p3').css({
      border: 'none'
    })

    this.currentPlayer++;

    if (this.currentPlayer === 4) {
      this.currentPlayer = (this.currentPlayer) % 4;
      this.turnsCompleted++;

    }
    $(".current-player").text("PLAYER " + (this.currentPlayer + 1) + " TURN");

    if (this.turnsCompleted === 2) {
      if (this.roundCount === 10) {
        this.endGame();
      } else {
        this.roundIncrement();
      }
    }
    $('#p' + this.currentPlayer).removeClass('avoid-clicks');
    $('#p' + this.currentPlayer).css({
      border: '8px solid ' + this.playerList[this.currentPlayer].color
      })
    }
  pass() {
    this.playerTurnTracker();
  }
  endGame() {
    this.playerList.sort(function (a, b) {
      return b.score - a.score;
    });

    // Create modal showing all scores
    var modal = $('<div>').addClass('modal');
    var modalShowContent = $('<div>').addClass('modalContent hidden');
    var showScoreButton = $('<button>').addClass('showScores').text('Show Scores');
    modal.append(showScoreButton);
    showScoreButton.click(function () {
      modalShowContent.removeClass('hidden');
    })
    for (var player = 0; player < this.playerList.length; ++player) {
      var score = $('<span>').text('Player ' + (this.playerList[player].order+1) +
                                   ' finished with ' + this.playerList[player].score +
                                   'pts');
      modalShowContent.append(score);
    }
    modal.append(modalShowContent);
    $('.game-container').after(modal);
    $('.game-container').addClass('avoid-clicks');
  }

}
