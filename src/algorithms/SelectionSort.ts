import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";
import { swap } from "../utils/arrays";

type SelectionSortState = SortState & {
    name: 'SelectionSortState';
    array: number[];
    isComplete: boolean;
    
    currentIndex: number;
}

export default class SelectionSort implements ISortAlgorithm {
    readonly name = 'Selection Sort';
    
    createState(array: number[]): SelectionSortState {
        return {
            name: 'SelectionSortState',
            array: [...array],
            currentIndex: 0,
            isComplete: false,
        }
    }

    step(state: SelectionSortState): SelectionSortState {
        let { array, currentIndex, isComplete } = state;

        if (isComplete) {
            return state;
        }

        if (currentIndex >= array.length - 1) {
            isComplete = true;
        }

        // Scan unsorted part of the array to find an element smaller than the current element
        let unsortedMinimumIndex = currentIndex;
        for (let i = currentIndex + 1; i < array.length; i++) {
            if (array[i] < array[unsortedMinimumIndex]) {
                unsortedMinimumIndex = i;
            }
        }

        if (unsortedMinimumIndex === currentIndex) {
            // No smaller element found, move to next index
            currentIndex++;
            return this.step({...state, currentIndex, isComplete} );
        }

        // If found swap with the current element.
        if (unsortedMinimumIndex !== -1) {
            array = swap(array, currentIndex, unsortedMinimumIndex);
        }

        currentIndex++;
        
        return {...state, array, currentIndex, isComplete};
    }

    isValidState(state: SortState): state is SelectionSortState {
        return state.name === 'SelectionSortState';
    }
}