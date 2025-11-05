export function random(size: number, randomFn: () => number = Math.random): number[] {
    const array = Array(size).fill(0).map((_, index) => index + 1);
    return array.sort(() => randomFn() - 0.5);
}