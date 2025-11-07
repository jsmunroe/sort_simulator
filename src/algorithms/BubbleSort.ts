import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";
import { swap } from "../utils/arrays";

type BubbleSortState = SortState & {
    array: number[];
    isComplete: boolean;
    
    currentIndex: number;
    hasChanged: boolean;
}

export default class BubbleSort implements ISortAlgorithm {
    readonly name = 'Bubble Sort';

    createState(array: number[]): BubbleSortState {
        return {
            array: [...array],
            currentIndex: 0,
            hasChanged: false,
            isComplete: false,
        }
    }

    step(state: BubbleSortState): BubbleSortState {
        let { array, currentIndex, hasChanged, isComplete } = state;

        if (isComplete) {
            return state;
        }

        if (currentIndex >= array.length - 1) {
            if (!hasChanged) {
                isComplete = true;

                return {...state, isComplete};
            }

            currentIndex = 0;
            hasChanged = false;
        }

        if (array[currentIndex] > array[currentIndex + 1]) {
            const current = array[currentIndex];
            const next = array[currentIndex + 1];

            if (current > next) {
                array = swap(array, currentIndex, currentIndex + 1);
            }

            hasChanged = true;
        }
        else {
            // Nothing has changed in this step, so increment and step again.

            currentIndex++;

            return this.step({...state, array, currentIndex, hasChanged, isComplete});

        }   

        currentIndex++;


        return {...state, array, currentIndex, hasChanged, isComplete};
    }
}