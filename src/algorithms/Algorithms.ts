import BubbleSort from "./BubbleSort";
import InsertionSort from "./InsertionSort";
import MergeSort from "./MergeSort";
import SelectionSort from "./SelectionSort";
import QuickSort from "./QuickSort";
import HeapSort from "./HeapSort";
import CountSort from "./CountSort";
import BucketSort from "./BucketSort";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";

const Algorithms = {
    BubbleSort: new BubbleSort(),
    SelectionSort: new SelectionSort(),
    InsertionSort: new InsertionSort(),
    MergeSort: new MergeSort(),
    QuickSort: new QuickSort(),
    HeapSort: new HeapSort(),
    CountSort: new CountSort(),
    BucketSort: new BucketSort(),
    all,
}

function all(): ISortAlgorithm[] {
    const algorithms: ISortAlgorithm[] = [];
    for (const key in Algorithms) {
        const algorithm = Algorithms[key as keyof typeof Algorithms];

        if (typeof algorithm === 'function') {
            continue;
        }

        algorithms.push(algorithm);
    }
    return algorithms;
}

export default Algorithms;