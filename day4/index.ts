import * as fs from 'fs';
const cardLines = fs.readFileSync('input.txt','utf8').split('\n');

class Card {
    winningNumbers: string[]
    actualNumbers: string[]

    constructor(line: string){
        const numberSets = line.replace(/Card.*?:/g, ' ').split(' | ')
        this.winningNumbers = numberSets[0].trim().split(/\s+/)
        this.actualNumbers = numberSets[1].trim().split(/\s+/)
    }
}

const cards = cardLines.map(cardLine => {
    return new Card(cardLine)
})

const cardValues = cards.map(card => {
    const winners = card.actualNumbers.filter(num => card.winningNumbers.includes(num))
    const winnersSum = winners.reduce((prev, cur) => { 
        if(prev === 0){
            return 1
        }
        return prev * 2
    }, 0)
    console.log(card.winningNumbers.join(','), ' | ', card.actualNumbers.join(','), winnersSum)

    return winnersSum
})

const overallSum = cardValues.reduce((partialSum, a) => partialSum! + a!, 0);

console.log(overallSum)