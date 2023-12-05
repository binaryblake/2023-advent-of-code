import * as fs from 'fs';
const games = fs.readFileSync('input.txt','utf8').split('\n');
const gameRegex = /Game (.*): /
// PART 1
const rules: {[key: string]: number} = {
    'red': 12,
    'green': 13,
    'blue': 14
}

const validGames = games.map(game => {
    const gameId = Number(game.match(gameRegex)![1])
    const sets = game.replace(gameRegex, '').split('; ')

    for(const set of sets){
        const reveals = set.split(', ');
        for(const reveal of reveals){
            const [count, color] = reveal.split(' ');
            if(Number(count) > rules[color]) {
                return null
            }
        }
    }
    return gameId;
})
.filter(game => game !== null)
.reduce((partialSum, a) => partialSum! + a!, 0);

console.log('VALID GAMES SUM:', validGames);

// PART 2
const minimumCubesSum = games.map(game => {
    const sets = game.replace(gameRegex, '').split('; ')
    let minimums: {[key: string]: number} = {
        'red': 0,
        'green': 0,
        'blue': 0
    }

    for(const set of sets){
        const reveals = set.split(', ');
        for(const reveal of reveals){
            const [count, color] = reveal.split(' ');
            if(+count > minimums[color]) {
                minimums[color] = +count;
            }
        }
    }

    return minimums['red'] * minimums['green'] * minimums['blue'];
}).reduce((partialSum, a) => partialSum! + a!, 0);

console.log('MINIMUM CUBES POWER SUM:', minimumCubesSum);