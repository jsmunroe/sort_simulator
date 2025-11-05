import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";

type BubbleSortState = SortState & {
    array: number[];
    isComplete: boolean;
    
    currentIndex: number;
    hasChanged: boolean;
}

export default class BubbleSort implements ISortAlgorithm {
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

        if (array[currentIndex] > array[currentIndex + 1]) {
            const current = array[currentIndex];
            const next = array[currentIndex + 1];

            if (current > next) {
                array = array.map((item, index) => {
                    if (index === currentIndex) return next;

                    if (index === currentIndex + 1) return current;

                    return item;
                });
            }

            hasChanged = true;
        }   

        currentIndex++;
        if (currentIndex >= array.length - 1) {
            if (!hasChanged) {
                isComplete = true;
            }

            currentIndex = 0;
            hasChanged = false;
        }

        return {...state, array, currentIndex, hasChanged, isComplete};
    }
}