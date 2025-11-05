import BubbleSort from "./BubbleSort";
import InsertionSort from "./InsertionSort";
import MergeSort from "./MergeSort";
import SelectionSort from "./SelectionSort";
import QuickSort from "./QuickSort";

const Algorithms = {
    BubbleSort: new BubbleSort(),
    SelectionSort: new SelectionSort(),
    InsertionSort: new InsertionSort(),
    MergeSort: new MergeSort(),
    QuickSort: new QuickSort(),
}

export default Algorithms;