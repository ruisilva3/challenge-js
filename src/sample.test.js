const {summarizePlayers} = require('./index');

describe('summarizePlayers – basic cases', () => {
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

    test('empty input returns empty array', () => {
        expect(summarizePlayers([])).toEqual([]);
    });
});