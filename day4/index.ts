import * as fs from 'fs';
const cardLines = fs.readFileSync('input.txt','utf8').split('\n');

class Card {
    winningNumbers: string[]
    actualNumbers: string[]
    winners: string[] = []
    cardNumber: number
    copies: number = 0

    constructor(line: string){
        this.cardNumber = +(line.match(/Card(.*?):/)![1].trim())
        const numberSets = line.replace(/Card.*?:/g, ' ').split(' | ')
        this.winningNumbers = numberSets[0].trim().split(/\s+/)
        this.actualNumbers = numberSets[1].trim().split(/\s+/)
    }
}

const cards = cardLines.map(cardLine => {
    return new Card(cardLine)
})

const cardValues = cards.map((card, index) => {
    const winners = card.actualNumbers.filter(num => card.winningNumbers.includes(num))
    card.winners = winners;

    // for the original
    for(let j = 0; j < winners.length; j++){
        cards[index + j + 1].copies = cards[index + j + 1].copies + 1
    }

    // for the copies
    for(let i = 0; i < card.copies; i++){
        for(let j = 0; j < winners.length; j++){
            cards[index + j + 1].copies = cards[index + j + 1].copies + 1
        }
    }
    
    const winnersSum = winners.reduce((prev, cur) => { 
        if(prev === 0){
            return 1
        }
        return prev * 2
    }, 0)

    return winnersSum
})

const overallSum = cardValues.reduce((partialSum, a) => partialSum! + a!, 0);
const cardCount = cards.reduce((partialSum, card) => partialSum + card.copies + 1, 0);

console.log(overallSum)
console.log(cardCount)