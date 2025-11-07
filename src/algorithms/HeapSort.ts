import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";
import { compare, swap } from "../utils/arrays";

type HeapSortState = SortState & {
    array: number[];

    currentIndex: number;

    step: 'initializing' | 'buildingMaxHeap' | 'sorting' | 'heapifying';
    returnStep: 'buildingMaxHeap' | 'sorting';

    isComplete: boolean;

    heapSize: number;
    rootIndex: number;
    

}

export default class HeapSort implements ISortAlgorithm {
    readonly name = 'Heap Sort';

    createState(array: number[]): HeapSortState {
        return {
            array: [...array],
            currentIndex: array.length - 1,
            step: 'initializing',
            returnStep: 'buildingMaxHeap',
            isComplete: false,
            heapSize: array.length,
            rootIndex: 0,
        }
    }

    doStep(state: HeapSortState): HeapSortState {
        let { array, isComplete, currentIndex, step } = state;

        if (isComplete) {
            return state;
        }

        if (step === 'initializing') {

            currentIndex = Math.floor(array.length / 2) - 1;
            step = 'buildingMaxHeap';

            return {...state, currentIndex, step};
        }

        if (step === 'buildingMaxHeap') {
            if (currentIndex < 0) {

                step = 'sorting';
                currentIndex = array.length - 1;

                return {...state, step, currentIndex};
            }

            currentIndex--;

            return {...state, step: 'heapifying', returnStep: 'buildingMaxHeap', array, currentIndex, heapSize: array.length, rootIndex: currentIndex};
        }

        if (step === 'sorting') {
            if (currentIndex <= 0) {
                isComplete = true;
                array = [...array];
                return {...state, array, isComplete};
            }

            array = swap(array, 0, currentIndex);
            currentIndex--;

            return {...state, step: 'heapifying', returnStep: 'sorting', array, currentIndex, heapSize: currentIndex + 1, rootIndex: 0}
        }

        if (step === 'heapifying') {
            let { heapSize, rootIndex } = state;

            let largest = rootIndex;
            const leftChild = 2 * rootIndex + 1;
            const rightChild = 2 * rootIndex + 2;

            if (leftChild < heapSize && array[leftChild] > array[largest]) {
                largest = leftChild;
            }
            else {
                largest = rootIndex;
            }

            if (rightChild < heapSize && array[rightChild] > array[largest]) {
                largest = rightChild;
            }

            if (largest !== rootIndex) {
                array = swap(array, rootIndex, largest);

                return {...state, step: 'heapifying', array, rootIndex: largest };
            }

            return {...state, step: state.returnStep, array };
        }

        return {...state, array, isComplete, currentIndex};
    }

    step(state: HeapSortState): HeapSortState {
        let newState: HeapSortState = state;
        
        do {
            newState = this.doStep(newState);

        } while (compare(newState.array, state.array) && !newState.isComplete);

        return newState;
    }
}