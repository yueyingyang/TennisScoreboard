const conf = require('./constants')
var g = require('./global')

var gameScore = g.gameScore
var setScore = g.setScore
var message = g.message

var set_num = 0;
var TieBreakFLAG = 0;

function TieBreak(){
    gameSocre[idx] = gameSocre[idx] + 1;
    if (gameSocre[idx] >= conf.TiebreakPoint){
        winMatch();
    }
}

function winMatch(idx){
    set_num++;
    g.message = `Player ${parseInt(idx) + 1} win Set ${set_num}!`
    if (winSet[idx] > conf.MatchWinSet){
        MatchEnd(idx);
    }
}

function MatchEnd(idx) {
    g.message = `Player ${parseInt(idx) + 1} win the Match!`
}

function resetAllScore() {
    g.message = `Reset All Score!`
    // Init score state.
    Object.assign(setScore, [[0, 0],[0, 0],[0, 0]])
    Object.assign(gameScore, [0, 0])
}

function updateGameScore(idx) {
    g.message = `Player ${parseInt(idx)  + 1} scored!`
    if (TieBreakFLAG == 1){
        TieBreak();
    }
    console.log(gameScore);
    gameScore[idx] = gameScore[idx] + 1;
    let other = (idx + 1) % 2;
    console.log(gameScore);
    if (gameScore[idx] == 4) {
        if (gameScore[other] < 3) {
            updateSetScore(idx);
        }
        if (gameScore[other] == 4) {
            Object.assign(gameScore, [3, 3]);
        }
    }
    if (gameScore[idx] == 5) {
        updateSetScore(idx);
    }
}

function updateSetScore(idx) {
    Object.assign(gameScore, [0, 0]);
    setScore[set_num][idx] = setScore[set_num][idx] + 1;
    let other = (idx + 1) % 2;
    if (setScore[set_num][idx] >= 6) {
        if (setScore[set_num][idx] - setScore[set_num][other] >= 2){
            winMatch();
        }
        if (setScore[set_num][idx] == 6 && setScore[set_num][other] == 6){
            TieBreakFLAG = 1;
            Object.assign(gameScore, [0, 0])
        }
    }
}


exports.reset = resetAllScore;
exports.updateGameScore = updateGameScore;
exports.updateSetScore = updateSetScore;