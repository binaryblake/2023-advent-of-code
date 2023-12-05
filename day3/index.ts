import * as fs from 'fs';
const schematic = fs.readFileSync('input.txt','utf8').split('\n');

interface Part {
    value: number;
    line: number;
    positions: number[]
}

const candidateParts: Part[] = schematic.map((line, lineNumber) => {
    let candidatePart = '';
    const lineParts: Part[] = []
    for(let i = 0; i < line.length; i++){
        const processCandidate = () => {
            const positions = [];
            for(let j = 0; j < candidatePart.length; j++){
                positions.push(i - j - 1);
            }
            lineParts.push({
                value: +candidatePart,
                line: lineNumber,
                positions: positions.reverse()
            })
            candidatePart = ''
        }

        const char = line[i];
        const value = parseInt(char);
        if(!isNaN(value)){
            candidatePart += char
            if(i === line.length - 1){
                processCandidate()
            }
        } else if(candidatePart !== '') {
            processCandidate()
        }
    }
    return lineParts;
}).flat()

const actualParts = candidateParts.filter(part => {
    const isSymbol = (c: string) => {
        return isNaN(+c) && c !== '.'
    }
    let line: number = part.line;
    let symbolsBeside: any[] = [];
    let symbolsAbove: any[] = [];
    let symbolsBelow: any[] = [];
    let positions: number[] = [part.positions[0] - 1, ...part.positions, part.positions[part.positions.length-1] + 1].filter(position => position > 0);

    //beside
    symbolsBeside = positions.filter(position => {
        return isSymbol(schematic[line][position])
    })

    if(part.line !== 0){
        //above
        line = part.line - 1;
        
        symbolsAbove = positions.filter(position => {
            return isSymbol(schematic[line][position])
        })
    }

    if(part.line !== schematic.length - 1) {
        //below
        line = part.line + 1;
        symbolsBelow = positions.filter(position => {
            return isSymbol(schematic[line][position])
        })
    }
        
    return symbolsBeside.length > 0 || symbolsAbove.length > 0 || symbolsBelow.length > 0;
})

const partValueSum = actualParts.reduce((partialSum, part) => partialSum + part.value, 0);

console.log('PART NUMBER SUM', partValueSum);