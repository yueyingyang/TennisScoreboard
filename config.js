const SCORE_SYSTEM = {
    0: 'Love',
    1: '15',
    2: '30',
    3: '40',
    4: 'AD'
};
// Define the rules of the game.
const TiebreakPoint = 7;
const MatchWinSet = 2;

// Use the map to convert to the conventional expressions.
function gameScoreConverter(gameScore) {
    return [SCORE_SYSTEM[gameScore[0]], SCORE_SYSTEM[gameScore[1]]]
}

exports.SCORE_SYSTEM = SCORE_SYSTEM
exports.gameScoreConverter = gameScoreConverter
exports.TiebreakPoint = TiebreakPoint
exports.MatchWinSet = MatchWinSet