const conf = require('./config')
var g = require('./global')

var gameScore = g.gameScore
var setScore = g.setScore

var set_num = 0;
var winSet = [0, 0]

// Reset the status.
resetAllScore = () => {
  g.message = `Reset All Score!`;
  set_num = 0;
  g.FLAG.TieBreakFLAG = 0;
  winSet = [0, 0];
  g.FLAG.MatchFLAG = 0;

  // Init score state.
  Object.assign(setScore, [
    [0, 0],
    [0, 0],
    [0, 0]
  ]);
  Object.assign(gameScore, [0, 0]);
};

// Plus game score by 1, idx is the index of player who wins this score
updateGameScore = idx => {
  idx = parseInt(idx);
  if (g.FLAG.TieBreakFLAG == 1) {
    TieBreak(idx);
    return;
  }
  g.message = `Player ${idx + 1} scored!`;
  gameScore[idx] = gameScore[idx] + 1;
  // Get index of another player
  let other = (idx + 1) % 2;
  if (gameScore[idx] == 4) {
    if (gameScore[other] < 3) {
    // Win the game
      updateSetScore(idx);
      return;
    }
    if (gameScore[other] == 4) {
    // AD - AD, return to 40 - 40
      Object.assign(gameScore, [3, 3]);
      return;
    }
  }
  // AD(1) - 40
  if (gameScore[idx] == 5) {
    updateSetScore(idx);
  }
};

// Plus set score by 1
updateSetScore = idx => {
  g.message = `Player ${idx + 1} win a game!`;
  Object.assign(gameScore, [0, 0]);
  setScore[set_num][idx] = setScore[set_num][idx] + 1;
  let other = (idx + 1) % 2;
  if (setScore[set_num][idx] >= 6) {
    // Win a set
    if (setScore[set_num][idx] - setScore[set_num][other] >= 2) {
      updateCurrentSet(idx);
    }
    // Tie break
    if (setScore[set_num][idx] == 6 && setScore[set_num][other] == 6) {
      g.FLAG.TieBreakFLAG = 1;
      g.message = `Tie Break!`;
      Object.assign(gameScore, [0, 0]);
    }
  }
};

// If tiebreak, simply plus game score by 1 each time till reaches 7.
TieBreak = (idx) => {
    gameScore[idx] = gameScore[idx] + 1;
    if (gameScore[idx] >= conf.TiebreakPoint) {
        setScore[set_num][idx] = 'Tie Break Winner';
        updateCurrentSet(idx);
        g.FLAG.TieBreakFLAG = 0;
    }
}

// Update current set number and check if winning a match
updateCurrentSet = (idx) => {
    Object.assign(gameScore, [0, 0]);
    winSet[idx] ++;
    console.log('Win Set update:' + winSet[idx]);
    set_num++;
    g.message = `Player ${idx + 1} win Set ${set_num}!`
    if (winSet[idx] >= conf.MatchWinSet){
        MatchEnd(idx);
    }
}

// Win the match!
MatchEnd = (idx) => {
    g.message = `Player ${parseInt(idx) + 1} win the MATCH!`
    // Help reset after the match ends
    g.FLAG.MatchFLAG = 1;
}


exports.reset = resetAllScore;
exports.updateGameScore = updateGameScore;