export function swap<TItem>(array: TItem[], indexA: number, indexB: number): TItem[] {
    if (indexA === indexB) {
        return array;
    }

    if (indexA > indexB) {
        [indexA, indexB] = [indexB, indexA]; // Ensure that indexB > indexA
    }

    if (indexA < 0 || indexA >= array.length ||
        indexB < 0 || indexB >= array.length) {
        throw new Error("swap: Indices are out of bounds.");
    }

    const newArray = [
        ...array.slice(0, indexA), 
        array[indexB], // Use indexB here to swap values.
        ...array.slice(indexA + 1, indexB), 
        array[indexA], // Use indexA here to swap values.
        ...array.slice(indexB + 1)
    ];

    return newArray;
}

export function swapInPlace<TItem>(array: TItem[], indexA: number, indexB: number): void {
    if (indexA === indexB) {
        return;
    }

    if (indexA < 0 || indexA >= array.length ||
        indexB < 0 || indexB >= array.length) {
        throw new Error("swapInPlace: Indices are out of bounds.");
    }

    [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
}

export function compare(a: number[], b: number[]): boolean {
    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

declare global {
    interface Array<T> {
        findNextIndex(predicate: (item: T) => boolean, fromIndex: number): number;
    }
}

if (!Array.prototype.findNextIndex) {
    Array.prototype.findNextIndex = function <T>(this: T[], predicate: (item: T) => boolean, fromIndex: number): number  {
        const index = this.slice(fromIndex).findIndex(predicate);
        const adjustedIndex = index !== -1 ? index + fromIndex : -1;

        return adjustedIndex;
    };
}
