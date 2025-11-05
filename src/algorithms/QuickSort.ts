import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";
import QuickSet from "../models/QuickSet";

type QuickSortState = SortState & {
    array: number[];
    isComplete: boolean;

    quickSet: QuickSet;
}

export default class QuickSort implements ISortAlgorithm {
    createState(array: number[]): QuickSortState {
        return {
            array: [...array],
            isComplete: false,
            quickSet: new QuickSet(array, 0, array.length - 1),
        }
    }

    step(state: QuickSortState): QuickSortState {
        let { array, isComplete, quickSet} = state;

        if (isComplete) {
            return state;
        }

        if (quickSet.step()) {
            isComplete = true;
        }

        array = [...quickSet.array];

        return {...state, array, isComplete, quickSet};
    }
}