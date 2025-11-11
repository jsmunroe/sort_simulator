export interface IGenerator {
    (): number[];
}

export type GeneratorType = 'consecutive' | 'random' | 'nearly-sorted';


export function createGenerator(type: GeneratorType, count: number): IGenerator {
    switch (type) {
        case 'consecutive':
            return consecutive(count);
        case 'random':
            return random(count);
        case 'nearly-sorted':
            return nearlySorted(count);
    }
}

export function consecutive(count: number, randomFn: () => number = Math.random): IGenerator {
    return () => {
        const array = Array(count).fill(0).map((_, index) => index + 1);
        array.sort(() => randomFn() - 0.5);
        return array;
    }
}

export function random(count: number, maxValue: number = 100, randomFn: () => number = Math.random): IGenerator {
    return () => {
        const array = Array(count).fill(0).map(() => Math.floor(randomFn() * maxValue));
        return array;
    }
}

export function nearlySorted(count: number, swapCount: number = 5, randomFn: () => number = Math.random): IGenerator {
    return () => {
        const array = Array(count).fill(0).map((_, index) => index + 1);
        for (let i = 0; i < swapCount; i++) {
            const j = Math.floor(randomFn() * count);
            const k = Math.floor(randomFn() * count);
            [array[j], array[k]] = [array[k], array[j]];
        }
        return array;
    }
}
