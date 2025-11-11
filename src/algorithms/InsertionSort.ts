import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";
import { shift } from "../utils/arrays";

type InsertionSortState = SortState & {
    name: 'InsertionSortState';
    array: number[];
    isComplete: boolean;
    
    currentIndex: number;
}

export default class InsertionSort implements ISortAlgorithm {
    readonly name = 'Insertion Sort';
    
    createState(array: number[]): InsertionSortState {
        return {
            name: 'InsertionSortState',
            array: [...array],
            currentIndex: 0,
            isComplete: false,
        }
    }

    step(state: InsertionSortState): InsertionSortState {
        let { array, currentIndex, isComplete } = state;

        if (isComplete) {
            return state;
        }

        for (; currentIndex < array.length; currentIndex++) {
            const current = array[currentIndex];

            let i: number;
            for (i = currentIndex - 1; i >= 0 && array[i] > current; i--) {
                ;
            }

            if (currentIndex > i + 1) {
                array = shift(array, currentIndex, i + 1);
                break;
            }
        }
                    
        if (currentIndex >= array.length - 1) {
            isComplete = true;
        }

        return {...state, array, currentIndex, isComplete};
    }

    isValidState(state: SortState): state is InsertionSortState {
        return state.name === 'InsertionSortState';
    }
}