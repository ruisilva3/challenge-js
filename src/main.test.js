const {summarizePlayers} = require('./index');

describe('summarizePlayers – advanced scenarios', () => {
    test('example input', () => {
        const players = [
            {name: 'LeBron', scores: [25, 30, 28, 22]},
            {name: 'Curry', scores: [18, 21, 25, 19]},
            {name: 'Durant', scores: [30, 27, 29, 31]},
        ];
        expect(summarizePlayers(players)).toEqual([
            {name: 'Durant', avgPointsScoredPerGame: 29.25, mvp: 3},
            {name: 'LeBron', avgPointsScoredPerGame: 26.25, mvp: 1},
            {name: 'Curry', avgPointsScoredPerGame: 20.75, mvp: 0},
        ]);
    });

    test('empty input returns empty array', () => {
        expect(summarizePlayers([])).toEqual([]);
    });

    test('single player should have mvp = numGames', () => {
        const players = [
            {name: 'Solo', scores: [5, 10, 15, 20]},
        ];
        // Solo leads every game
        expect(summarizePlayers(players)).toEqual([
            {name: 'Solo', avgPointsScoredPerGame: 12.50, mvp: 4},
        ]);
    });

    test('ties for mvp in a round count for all tied players', () => {
        const players = [
            {name: 'A', scores: [5, 4]},
            {name: 'B', scores: [5, 3]},
        ];
        // Round 0: A & B tie at 5 ⇒ both +1
        // Round 1: A leads at 4 ⇒ A +1
        expect(summarizePlayers(players)).toEqual([
            {name: 'A', avgPointsScoredPerGame: 4.50, mvp: 2},
            {name: 'B', avgPointsScoredPerGame: 4.00, mvp: 1},
        ]);
    });

    test('tie on mvp uses avgPointsScoredPerGame as tiebreaker', () => {
        const players = [
            {name: 'A', scores: [10, 1, 0]},   // avg = 3.67, mvp = 1 (game 0)
            {name: 'B', scores: [5, 6, 2]},   // avg = 4.33, mvp = 1 (game 1)
            {name: 'C', scores: [4, 3, 5]},   // avg = 4.00, mvp = 1 (game 2)
        ];
        const result = summarizePlayers(players);
        expect(result.map(p => p.name)).toEqual(['B', 'C', 'A']);
        expect(result.map(p => p.avgPointsScoredPerGame))
            .toEqual([4.33, 4.00, 3.67]);
        expect(result.every(p => p.mvp === 1)).toBe(true);
    });

    test('decimal rounding is correct', () => {
        const players = [
            {name: 'X', scores: [1, 2]},  // avg = 1.50
            {name: 'Y', scores: [3, 4]}, // avg = 3.50
        ];
        // Only first two rounds count for X; Y leads both ⇒ mvpX=0, mvpY=2
        expect(summarizePlayers(players)).toEqual([
            {name: 'Y', avgPointsScoredPerGame: 3.50, mvp: 2},
            {name: 'X', avgPointsScoredPerGame: 1.50, mvp: 0},
        ]);
    });
});
