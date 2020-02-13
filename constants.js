const SCORE_SYSTEM = {
    0: 'Love',
    1: '15',
    2: '30',
    3: '40',
    4: 'AD'
};
const TiebreakPoint = 7;
const MatchWinSet = 2;

function gameScoreConverter(gameScore) {
    return [SCORE_SYSTEM[gameScore[0]], SCORE_SYSTEM[gameScore[1]]]
}

exports.SCORE_SYSTEM = SCORE_SYSTEM
exports.gameScoreConverter = gameScoreConverter
exports.TiebreakPoint = TiebreakPoint
exports.MatchWinSet = MatchWinSet