const express = require('express');
const bodyParser = require('body-parser');
const constants = require('./config')
var util = require('./changeScore')
var g = require('./global')
const app = express();

// Define template engine.
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
    
// Render the page 
app.get('/', (req, res) => {
    res.render('index', getScore());
})

// Help add score
app.post("/", (req, res) => {
  if(g.FLAG.MatchFLAG == 1){
    util.reset();
  }
  idx = req.body.player_idx;
  util.updateGameScore(idx);
  res.json(getScore())
});

// Reset the whole game
app.post("/reset",(req, res) => {
    util.reset();
    res.json(getScore())
})


// Listen to port.
app.listen(3000);
console.log('Listening to port 3000...');
util.reset(g.setScore, g.gameSocre);

// Prepare for the text to display
function getScore() {
  var info = {
    setScore: g.setScore,
    gameScore: constants.gameScoreConverter(g.gameScore),
    message: g.message
  };
  if (g.FLAG.TieBreakFLAG == 1) {
    Object.assign(info.gameScore, g.gameScore);
  }
  return info;
}

