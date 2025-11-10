export interface IGenerator {
    (): number[];
}

export function random(count: number, randomFn: () => number = Math.random): IGenerator {
    return () => {
        const array = Array(count).fill(0).map((_, index) => index + 1);
        array.sort(() => randomFn() - 0.5);
        return array;
    }
}