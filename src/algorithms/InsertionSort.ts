import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";

type InsertionSortState = SortState & {
    array: number[];
    isComplete: boolean;
    
    currentIndex: number;
}

export default class InsertionSort implements ISortAlgorithm {
    readonly name = 'Insertion Sort';
    
    createState(array: number[]): InsertionSortState {
        return {
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

        const current = array[currentIndex];

        let i: number;
        for (i = currentIndex - 1; i >= 0 && array[i] > current; i--) {
            ;
        }

        if (currentIndex > i + 1) {
            array = array.map((item, index) => {
                if (index === i + 1) return current;

                if (index > i + 1 && index <= currentIndex) return array[index - 1];

                    return item;
                });
        }
                            
        if (currentIndex < array.length - 1) {
                currentIndex++;
            }
        else {
            isComplete = true;
        }

        return {...state, array, currentIndex, isComplete};
    }
}