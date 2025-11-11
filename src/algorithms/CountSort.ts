import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";

type CountSortState = SortState & {
    name: 'CountSortState';
    originalArray: number[];
    array: number[];
    counts?: number[];
    accumulations?: number[]
    step: string;
    a: number;
    b: number;
    c: number;
    isComplete: boolean;
}

export default class CountSort implements ISortAlgorithm {
    readonly name = 'Count Sort';

    createState(array: number[]): CountSortState {
        return {
            name: 'CountSortState',
            originalArray: [...array],
            array: [...array],
            step: 'counting',
            a: 0,
            b: 1,
            c: array.length,
            isComplete: false,
        }
    }

    step(state: CountSortState): CountSortState {
        let { originalArray, array, isComplete, a, b, c, counts, accumulations, step} = state;

        let maximum = Math.max(...array);
        counts = counts ?? new Array(maximum + 1).fill(0);
        accumulations = accumulations ?? new Array(maximum + 1).fill(0);

        if (a < array.length) {
            step = 'counting';

            const value = array[a];
            counts[value]++;
            a++;
        }

        if (a >= array.length && b <= maximum) {
            step = 'accumulating';

            accumulations[b] += accumulations[b - 1] + counts[b];
            b++;
        }

        if (b > maximum && c >= 0) {
            step = 'trimming';

            array[accumulations[originalArray[c]] - 1] = originalArray[c];
            accumulations[originalArray[c]]--;
            c--;
        }

        if (c < 0) {
            step = '';
            counts = undefined;
            accumulations = undefined;
            isComplete = true;
        }

        return {...state, originalArray, array, isComplete, a, b, c, counts, accumulations, step};
    }

    isValidState(state: SortState): state is CountSortState {
        return state.name === 'CountSortState';
    }
}