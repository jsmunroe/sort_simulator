import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";
import MergeSet from "../models/MergeSet";

type MergeSortState = SortState & {
    array: number[];
    isComplete: boolean;
    
    mergeTree: MergeSet;
}

export default class MergeSort implements ISortAlgorithm {
    createState(array: number[]): MergeSortState {
        const mergeTree = new MergeSet(array, 0, array.length);

        return {
            array: [...array],
            isComplete: false,

            mergeTree,
        }
    }

    step(state: MergeSortState): MergeSortState {
        let { array, isComplete, mergeTree } = state;

        const mergeSet = this.findNextMergeSet(state.mergeTree);

        if (mergeSet === null) {
            isComplete = true;
            return state;
        }
        
        mergeSet.merge();

        array = [...mergeTree.array];

        return {...state, array, isComplete, mergeTree};
    }

    private findNextMergeSet(node: MergeSet): MergeSet | null {
        if (node.isMerged)  {
            return null;
        }

        if (node.left && !node.left.isMerged) {
            return this.findNextMergeSet(node.left);
        }

        if (node.right && !node.right.isMerged) {
            return this.findNextMergeSet(node.right);
        }

        return node; // left and right are merged, but this node is not.
    }
}