const express = require('express');
const bodyParser = require('body-parser');
const constants = require('./constants')
const util = require('./changeScore')
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


util.reset(g.setScore, g.gameSocre);
const getScore = () => ({
        setScore: g.setScore,
        gameScore: constants.gameScoreConverter(g.gameScore),
        message: g.message
})

app.get('/', (req, res) => {
    res.render('index', getScore());
})

app.post("/", (req, res) => {
  idx = req.body.player_idx;
  util.updateGameScore(idx);
  res.json(getScore())
});

app.post("/reset",(req, res) => {
    util.reset();
    res.json(getScore())
})


// Listen to port.
app.listen(3000);
console.log('Listening to port 3000...');

