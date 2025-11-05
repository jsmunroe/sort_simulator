import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";

type SelectionSortState = SortState & {
    array: number[];
    isComplete: boolean;
    
    currentIndex: number;
}

export default class SelectionSort implements ISortAlgorithm {
    createState(array: number[]): SelectionSortState {
        return {
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

        // Scan unsorted part of the array to find an element smaller than the current element
        let unsortedMinimumIndex = currentIndex;
        for (let i = currentIndex + 1; i < array.length; i++) {
            if (array[i] < array[unsortedMinimumIndex]) {
                unsortedMinimumIndex = i;
            }
        }

        // If found swap with the current element.
        if (unsortedMinimumIndex !== -1) {
            const current = array[currentIndex];
            const unsortedMinimum = array[unsortedMinimumIndex];

            array = array.map((item, index) => {
                if (index === currentIndex) return unsortedMinimum;

                if (index === unsortedMinimumIndex) return current;

                return item;
            });
        }

        currentIndex++;

        if (currentIndex >= array.length - 1) {
            isComplete = true;
        }
        
        return {...state, array, currentIndex, isComplete};
    }
}