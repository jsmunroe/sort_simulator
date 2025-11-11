import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";

type BucketSortState = SortState & {
    name: 'BucketSortState';
    originalArray: number[];
    array: number[];
    isComplete: boolean;

    a: number;
    b: number;

    buckets: number[][];
}

export default class BucketSort implements ISortAlgorithm {
    readonly name = 'Bucket Sort';

    createState(array: number[]): BucketSortState {
        return {
            name: 'BucketSortState',
            originalArray: [...array],
            array: [...array],
            isComplete: false,
            a: 0,
            b: 0,
            buckets: [],
        }
    }

    step(state: BucketSortState): BucketSortState {
        let { originalArray, array, isComplete, buckets, a, b } = state;

        if (isComplete) {
            return state;
        }

        if (!buckets.length) {
            buckets = Array(originalArray.length).fill([]) as number[][];
        }

        const maximum = Math.max(...originalArray);
        
        if (a < originalArray.length) {
            const value = originalArray[a];
            const index = Math.floor(value * originalArray.length / (maximum + 1));
            buckets[index] ??= [];
            buckets[index] = [...buckets[index], value];
            array[a] = 0;
            a++;
        }

        if (a >= originalArray.length && b < buckets.length) {
            buckets[b] = buckets[b]?.sort((a, b) => a - b) ?? [];

            b++;
        }

        if (b >= buckets.length) {
            isComplete = true;
            array = buckets.flat();
            buckets = [];
        }

        return {...state, originalArray, array, isComplete, buckets, a, b};
    }

    isValidState(state: SortState): state is BucketSortState {
        return state.name === 'BucketSortState';
    }
}