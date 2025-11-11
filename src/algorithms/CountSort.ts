import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";

type CountSortState = SortState & {
    name: 'CountSortState';
    array: number[];
    isComplete: boolean;
}

export default class CountSort implements ISortAlgorithm {
    readonly name = 'Count Sort';

    createState(array: number[]): CountSortState {
        return {
            name: 'CountSortState',
            array: [...array],
            isComplete: false,
        }
    }

    step(state: CountSortState): CountSortState {
        let { array, isComplete } = state;

        if (isComplete) {
            return state;
        }

        array = this.countSort(array);
        isComplete = true;
        
        return {...state, array, isComplete};
    }

    isValidState(state: SortState): state is CountSortState {
        return state.name === 'CountSortState';
    }

    private countSort(array: number[]): number[] {
        if (array.some(value => value < 0)) {
            throw new Error("CountSort only supports non-negative integers.");
        }

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