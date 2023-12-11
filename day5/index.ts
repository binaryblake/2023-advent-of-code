import * as fs from 'fs';
const lines = fs.readFileSync('input.txt','utf8').split('\n');

class Seed {
    id: number;
    soil: number | undefined;
    fertilizer: number | undefined;
    water: number | undefined;
    light: number | undefined;
    temperature: number | undefined;
    humidity: number | undefined;
    location: number | undefined;

    constructor(id: number) {
        this.id = id;
    }

    getSource(key: string): number {
        switch(key) {
            case 'seed-to-soil':
                return this.id
            case 'soil-to-fertilizer':
                return this.soil!
            case 'fertilizer-to-water':
                return this.fertilizer!
            case 'water-to-light':
                return this.water!
            case 'light-to-temperature':
                return this.light!
            case 'temperature-to-humidity':
                return this.temperature!
            case 'humidity-to-location':
                return this.humidity!
        }
        throw new Error(`cannot determine source for ${key}`)
    }

    set(key: string, value: number) {
        switch(key) {
            case 'seed-to-soil':
                this.soil = value
                break
            case 'soil-to-fertilizer':
                this.fertilizer = value
                break
            case 'fertilizer-to-water':
                this.water = value
                break
            case 'water-to-light':
                this.light = value
                break
            case 'light-to-temperature':
                this.temperature = value
                break
            case 'temperature-to-humidity':
                this.humidity = value
                break
            case 'humidity-to-location':
                this.location = value
                break
        }
    }
}

let seeds: Seed[] = []
let map: {[key: string]: number[][]} = {}
let currentMapKey: string = ''

lines.forEach(line => {
    if(line.startsWith('seeds: ')){
        seeds = line.replace(/seeds: /g, '').split(' ').map(nbrStr => new Seed(+nbrStr))
    }
    else if(line.endsWith(' map:')){
        currentMapKey = line.replace(/ map:/g, '')
    } else if(line.split(' ').length === 3){
        if(!map[currentMapKey]){
            map[currentMapKey] = []
        }
        map[currentMapKey].push(line.split(' ').map(nbrStr => +nbrStr))
    }
})

seeds.forEach(seed => {
    Object.keys(map).forEach(key => {
        const mapKey = map[key];
        const sourceId = seed.getSource(key)
        let found = false

        mapKey.forEach(element => {
            const target = element[0]
            const source = element[1]
            const range = element[2]
            
            if(sourceId >= source && sourceId < source + range){
                const diff = sourceId - source
                seed.set(key, target + diff)
                found = true
            }
        })

        if(!found) {
            seed.set(key, sourceId)
        }
    })
})

const minimumLocation = seeds.reduce((min, card) => min === 0 ? card.location! : Math.min(min, card.location!), 0);
console.log(minimumLocation)