import * as fs from 'fs';
const tokens = fs.readFileSync('input.txt','utf8').split('\n');
const calibrationValues = tokens.map(token => {
    let first, last;
    for(const element of token){
        const subject = Number(element);
        if(!isNaN(subject)){
            if(!first){
                first = subject;
            }
            last = subject;
        }
    }

    return Number((first || 0).toString() + (last || 0).toString());
})

console.log(calibrationValues)
const sum = calibrationValues.reduce((partialSum, a) => partialSum + a, 0);
console.log(sum)
