import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";

type BucketSortState = SortState & {
    array: number[];
    isComplete: boolean;
    
    currentIndex: number;
}

export default class BucketSort implements ISortAlgorithm {
    readonly name = 'Bucket Sort';

    createState(array: number[]): BucketSortState {
        return {
            array: [...array],
            currentIndex: 0,
            isComplete: false,
        }
    }

    step(state: BucketSortState): BucketSortState {
        let { array, currentIndex, isComplete } = state;

        if (isComplete) {
            return state;
        }
        
        array = this.bucketSort(array);
        isComplete = true;

        return {...state, array, currentIndex, isComplete};
    }

    private bucketSort(array: number[]): number[] {
        const buckets = Array(array.length).fill([]) as number[][];

        const maximum = array.length > 0 ? Math.max(...array) : 0;
        
        for (let value of array) {
            const index = Math.floor(value * array.length / (maximum + 1));
            buckets[index] = [...buckets[index], value];
        }

        for (let i = 0; i < buckets.length; i++) {
            buckets[i] = buckets[i].sort((a, b) => a - b);
        }

        array = buckets.flat();

        return array;
    }
}