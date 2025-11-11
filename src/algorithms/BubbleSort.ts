import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";
import { swap } from "../utils/arrays";

type BubbleSortState = SortState & {
    name: 'BubbleSortState';
    array: number[];
    isComplete: boolean;
    
    currentIndex: number;
    hasChanged: boolean;
}

export default class BubbleSort implements ISortAlgorithm {
    readonly name = 'Bubble Sort';

    createState(array: number[]): BubbleSortState {
        return {
            name: 'BubbleSortState',
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

        for (currentIndex; currentIndex < array.length; currentIndex++) {
            if (currentIndex >= array.length - 1) {
                if (!hasChanged) {
                    isComplete = true;

                    return {...state, isComplete};
                }

                currentIndex = -1;
                hasChanged = false;
                break;
            }

            if (array[currentIndex] > array[currentIndex + 1]) {
                const current = array[currentIndex];
                const next = array[currentIndex + 1];

                if (current > next) {
                    array = swap(array, currentIndex, currentIndex + 1);
                }

                hasChanged = true;
                break;
            }
        }

        return {...state, array, currentIndex, hasChanged, isComplete};
    }

    isValidState(state: SortState): state is BubbleSortState {
        return state.name === 'BubbleSortState';
    }
}