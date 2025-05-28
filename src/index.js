/**
 * @param {{ name: string; scores: number[] }[]} players
 * @returns {{ name: string; avgPointsScoredPerGame: number; mvp: number }[]}
 */
function summarizePlayers(players) {
}


const players = [
    {name: 'LeBron', scores: [25, 30, 28, 22]},
    {name: 'Curry', scores: [18, 21, 25, 19]},
    {name: 'Durant', scores: [30, 27, 29, 31]},
];

console.log(summarizePlayers(players));

/* Expected output:
[
  { name: 'Durant', avgPointsScoredPerGame: 29.25, mvp: 3 },
  { name: 'LeBron', avgPointsScoredPerGame: 26.25, mvp: 1 },
  { name: 'Curry',  avgPointsScoredPerGame: 20.75, mvp: 0 }
]
*/
console.log(summarizePlayers([])); // Expected output: []

module.exports = {summarizePlayers};