# Tennis Scoreboard

## Get started

1. `npm install`
2. `npm run start`
3. Open http://localhost:3000/

## Run test

`npn test`

## Assumption

1. Win a match by winning 2 out of 3 sets.
2. Restart the game if try to score after winning the match.

## Implementation

1. Click **Scored** button to call `/` by ajax post methods.
2. `POST /` would update global varibles, which stores the states of the match.
3. Reload the page in success callback.

## Code Structure

- index.js: node server
- changeScore.js: functions of tenning score rules.
- config.js, global.js: configuration and score varibles

## Improvement

1. Due to the tight time and cumbersome jQuery DOM operation, I choose to simply reload the whole page in this version. But reloading the page each time causes bad performance.

- Solution: Only update particular DOM after receiving the new data.
- Cost: it is easy to use other front-end framework like Vuejs or Reactjs.
