import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";

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

    step(state: HeapSortState): HeapSortState {
        let { array, isComplete, currentIndex, step } = state;

        if (isComplete) {
            return state;
        }

        if (step === 'initializing') {

            currentIndex = Math.floor(array.length / 2) - 1;
            step = 'buildingMaxHeap';

            console.log(`${step}: ${array.join(', ')}`);
            return {...state, currentIndex, step};
        }

        if (step === 'buildingMaxHeap') {
            if (currentIndex < 0) {

                step = 'sorting';
                currentIndex = array.length - 1;

                return {...state, step, currentIndex};
            }

            if (currentIndex >= 0) {
                array = this.heapify(array, array.length, currentIndex);
            }

            currentIndex--;

            console.log(`${step}: ${array.join(', ')}`);
            return {...state, step: 'heapifying', returnStep: 'buildingMaxHeap', array, currentIndex, heapSize: array.length, rootIndex: currentIndex};
        }

        if (step === 'sorting') {
            if (currentIndex <= 0) {
                isComplete = true;
                array = [...array];
                return {...state, array, isComplete};
            }

            [array[0], array[currentIndex]] = [array[currentIndex], array[0]];

            currentIndex--;

            console.log(`${step}: ${array.join(', ')}`);
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
                const largestItem = array[largest];
                const rootItem = array[rootIndex];

                array = array.map((item, index) => {
                    if (index === rootIndex) return largestItem;
                    if (index === largest) return rootItem;
                    return item;
                });

                console.log(`${step}: ${array.join(', ')}`);
                return {...state, step: 'heapifying', array, rootIndex: largest };
            }

            console.log(`${step}: ${array.join(', ')}`);
            return {...state, step: state.returnStep, array };
        }

        return {...state, array, isComplete, currentIndex};
    }

    private heapify(array: number[], heapSize: number, rootIndex: number): number[] {
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
            const largestItem = array[largest];
            const rootItem = array[rootIndex];

            array = array.map((item, index) => {
                if (index === rootIndex) return largestItem;
                if (index === largest) return rootItem;
                return item;
            });

            return this.heapify(array, heapSize, largest);
        }

        return array;
    }
}