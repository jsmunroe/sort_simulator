import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";

type CountSortState = SortState & {
    array: number[];
    isComplete: boolean;
    
    currentIndex: number;
}

export default class CountSort implements ISortAlgorithm {
    createState(array: number[]): CountSortState {
        return {
            array: [...array],
            currentIndex: 0,
            isComplete: false,
        }
    }

    step(state: CountSortState): CountSortState {
        let { array, currentIndex, isComplete } = state;

        if (isComplete) {
            return state;
        }

        array = this.countSort(array);
        isComplete = true;
        
        return {...state, array, currentIndex, isComplete};
    }

    private countSort(array: number[]): number[] {
        const maximum = Math.max(...array);
        const count = new Array(maximum + 1).fill(0);

        for (let value of array) {
            count[value]++;
        }

        for (let i = 1; i <= maximum; i++) {
            count[i] += count[i - 1];
        }

        const output = new Array(array.length).fill(0);
        for (let i = array.length - 1; i >= 0; i--) {
            output[count[array[i]] - 1] = array[i];
            count[array[i]]--;
        }

        return output;
    }

}