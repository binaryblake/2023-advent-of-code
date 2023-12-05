import * as fs from 'fs';
const schematic = fs.readFileSync('input.txt','utf8').split('\n');

interface Part {
    value: number;
    line: number;
    positions: number[]
}

interface Gear {
    line: number;
    position: number
    ratio: number | undefined
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

// PART 1
const actualParts = candidateParts.filter(part => {
    const isSymbol = (c: string) => {
        return isNaN(+c) && c !== '.'
    }
    let line: number = part.line;
    let symbolsBeside: any[] = [];
    let symbolsAbove: any[] = [];
    let symbolsBelow: any[] = [];
    const positions: number[] = [part.positions[0] - 1, ...part.positions, part.positions[part.positions.length-1] + 1].filter(position => position > 0);

    //beside
    symbolsBeside = positions.filter(position => {
        return isSymbol(schematic[line][position])
    })

    //above
    if(part.line !== 0){
        line = part.line - 1;
        
        symbolsAbove = positions.filter(position => {
            return isSymbol(schematic[line][position])
        })
    }

    //below
    if(part.line !== schematic.length - 1) {
        line = part.line + 1;
        symbolsBelow = positions.filter(position => {
            return isSymbol(schematic[line][position])
        })
    }
        
    return symbolsBeside.length > 0 || symbolsAbove.length > 0 || symbolsBelow.length > 0;
})

const partValueSum = actualParts.reduce((partialSum, part) => partialSum + part.value, 0);

console.log('PART NUMBER SUM', partValueSum);

// PART 2
const gears = schematic.map((line, lineNumber) => {
    const lineGears = [];
    for(let i = 0; i < line.length; i++){
        const char = line[i];
        if(char === '*'){
            const candidateGear: Gear = {
                line: lineNumber,
                position: i,
                ratio: undefined
            }

            const positionsToTest = (() => {
                const positions = [i];
                if(i !== 0){
                    positions.push(i - 1);
                } 
                if(i < line.length - 1) {
                    positions.push(i + 1);    
                }
                return positions
            })()

            // filter down actual parts if they are contiguous to each
            const connectedParts = actualParts.filter(part => {
                if(Math.abs(part.line - candidateGear.line) > 1) {
                    return false;
                }

                const positionMatches = part.positions.filter(position => {
                    return Math.abs(candidateGear.position - position) < 2
                })

                return positionMatches.length > 0;
            })

            if(connectedParts.length === 2){
                candidateGear.ratio = connectedParts[0].value * connectedParts[1].value
                lineGears.push(candidateGear);
            }
        }
    }

    return lineGears;
}).flat().reduce((partialSum, gear) => partialSum + gear.ratio!, 0);

console.log("GEAR RATIO SUM", gears)
