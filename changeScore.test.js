const update = require('./changeScore')
var g = require("./global");

// Test Logic to win a game.
// 4 - 0: win directly.
test("4 : 0", () => {
    update.reset()
    let i = 4;
    while(i--){
        update.updateGameScore(0);
    }
    expect(g.gameScore).toStrictEqual([0, 0]); 
    expect(g.setScore).toStrictEqual([
      [1, 0],
      [0, 0],
      [0, 0]]);
});

// Deuce then score 2 points continuely.
test("4 : 4 - AD - Win", () => {
  update.reset()
  let i = 4;
  while (i--) {
      update.updateGameScore(0);
      update.updateGameScore(1);
  }
  // AD each, return to Deuce.
  expect(g.gameScore).toStrictEqual([3, 3]);
  expect(g.setScore).toStrictEqual([
        [0, 0],
        [0, 0],
        [0, 0]
  ]);
  // player1 score twice.
  update.updateGameScore(0);
  expect(g.gameScore).toStrictEqual([4, 3]);
  expect(g.setScore).toStrictEqual([
      [0, 0],
      [0, 0],
      [0, 0]
  ]);
  update.updateGameScore(0);
  expect(g.gameScore).toStrictEqual([0, 0]);
  expect(g.setScore).toStrictEqual([
      [1, 0],
      [0, 0],
      [0, 0]
  ]);
});


// Test logic to win a set.
// Win Directly with 2 games advantage.
test("Set1 - 6 : 4", () => {
  update.reset()
  let i = 4 * 5;
//   5 - 0
  while (i--) {
      update.updateGameScore(0);
  }
  expect(g.setScore).toStrictEqual([
      [5, 0],
      [0, 0],
      [0, 0]
  ]);
//   5 - 4
  i = 4 * 4;
  while (i--) {
      update.updateGameScore(1);
  }
  expect(g.setScore).toStrictEqual([
      [5, 4],
      [0, 0],
      [0, 0]
  ]);
//   6 - 4
  i = 4;
  while (i--) {
      update.updateGameScore(0);
  }
  expect(g.setScore).toStrictEqual([
      [6, 4],
      [0, 0],
      [0, 0]
  ]);
  expect(g.message).toBe(`Player 1 win Set 1!`);
});

// Enter another set.
test("Set2 - 7 : 5", () => {
  update.reset()
  let i = 4 * 5;
  //   5 - 0
  while (i--) {
      update.updateGameScore(0);
  }
  expect(g.setScore).toStrictEqual([
      [5, 0],
      [0, 0],
      [0, 0]
  ]);
  //   5 - 5
  i = 4 * 5;
  while (i--) {
      update.updateGameScore(1);
  }
  expect(g.setScore).toStrictEqual([
      [5, 5],
      [0, 0],
      [0, 0]
  ]);
  //   7 - 5
  i = 4 * 2;
  while (i--) {
      update.updateGameScore(0);
  }
    expect(g.setScore).toStrictEqual([
        [7, 5],
        [0, 0],
        [0, 0]
    ]);
  expect(g.message).toBe(`Player 1 win Set 1!`);
});

// Set 2 - 0, win the match
test("Set2 - 7 : 5 & win the match", () => {
    let i = 4 * 5;
    //   5 - 0
    while (i--) {
        update.updateGameScore(0);
    }
    expect(g.setScore).toStrictEqual([
        [7, 5],
        [5, 0],
        [0, 0]
    ]);
    //   5 - 5
    i = 4 * 5;
    while (i--) {
        update.updateGameScore(1);
    }
    expect(g.setScore).toStrictEqual([
        [7, 5],
        [5, 5],
        [0, 0]
    ]);
    //   7 - 5
    i = 4 * 2;
    while (i--) {
        update.updateGameScore(0);
    }
    expect(g.setScore).toStrictEqual([
        [7, 5],
        [7, 5],
        [0, 0]
    ]);
    expect(g.message).toBe(`Player 1 win the MATCH!`);
});

// Tiebreak.
test("Tiebreak", () => {
    update.reset()
    let i = 4 * 5;
    //   5 - 0
    while (i--) {
      update.updateGameScore(0);
    }
    //   5 - 5
    i = 4 * 5;
    while (i--) {
      update.updateGameScore(1);
    }
    // 6 - 5
    i = 4;
    while (i--) {
    update.updateGameScore(1);
    }
    i = 4;
    while (i--) {
        update.updateGameScore(0);
    }
    expect(g.setScore).toStrictEqual([
      [6, 6],
      [0, 0],
      [0, 0]
    ]);
    expect(g.message).toBe(`Tie Break!`);
    i = 7;
    while (i--) {
        update.updateGameScore(0);
    }
    expect(g.setScore).toStrictEqual([
        ['Tie Break Winner', 6],
        [0, 0],
        [0, 0]
    ]);
});