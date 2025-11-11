import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";
import QuickSet from "../models/QuickSet";
import { areEqual } from "../utils/arrays";

type QuickSortState = SortState & {
    name: 'QuickSortState';
    array: number[];
    isComplete: boolean;

    quickSet: QuickSet;
}

export default class QuickSort implements ISortAlgorithm {
    readonly name = 'Quick Sort';
    
    createState(array: number[]): QuickSortState {
        return {
            name: 'QuickSortState',
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

        do {
            if (quickSet.step()) {
                isComplete = true;
                break;
            }

        } while (areEqual(quickSet.array, array));

        array = [...quickSet.array];

        return {...state, array, isComplete, quickSet};
    }

    isValidState(state: SortState): state is QuickSortState {
        return state.name === 'QuickSortState';
    }
}