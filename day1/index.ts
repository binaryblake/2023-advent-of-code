import * as fs from 'fs';
const tokens = fs.readFileSync('input.txt','utf8').split('\n');
const calibrationValues = tokens.map(token => {
    let firstDigit: number | undefined;
    let lastDigit: number | undefined;

    const spelledNumbersMap: {[key: string]: number} = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9
    }

    for(let i = 0; i < token.length; i++){
        const char = token[i];
        let subject = Number(char);
        if(!isNaN(subject)){
            if(!firstDigit){
                firstDigit = subject;
            }
            lastDigit = subject;
        } else {
            const candidateSpelledWords = Object.keys(spelledNumbersMap).filter(key => key.startsWith(char));
            for(let j = 0; j < candidateSpelledWords.length; j++){
                const candidateSpelledWord = candidateSpelledWords[j]
                const firstIndex = token.indexOf(candidateSpelledWord);
                const lastIndex = token.lastIndexOf(candidateSpelledWord)
                if(firstIndex === i || lastIndex === i){
                    subject = spelledNumbersMap[candidateSpelledWord];
                    if(!firstDigit){
                        firstDigit = subject;
                    }
                    lastDigit = subject
                }
            }            
        }
    }

    return Number((firstDigit || 0).toString() + (lastDigit || 0).toString());
})

const sum = calibrationValues.reduce((partialSum, a) => partialSum + a, 0);
console.log('ANSWER:', sum)
