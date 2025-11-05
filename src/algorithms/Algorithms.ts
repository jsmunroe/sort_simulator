import BubbleSort from "./BubbleSort";
import InsertionSort from "./InsertionSort";
import MergeSort from "./MergeSort";
import SelectionSort from "./SelectionSort";

const Algorithms = {
    BubbleSort: new BubbleSort(),
    SelectionSort: new SelectionSort(),
    InsertionSort: new InsertionSort(),
    MergeSort: new MergeSort(),
}

export default Algorithms;