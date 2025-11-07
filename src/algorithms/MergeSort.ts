import type { SortState } from "../contracts/ISortAlgorithm";
import type ISortAlgorithm from "../contracts/ISortAlgorithm";
import MergeSet from "../models/MergeSet";
import { compare } from "../utils/arrays";

type MergeSortState = SortState & {
    array: number[];
    isComplete: boolean;
    
    mergeTree: MergeSet;
}

export default class MergeSort implements ISortAlgorithm {
    readonly name = 'Merge Sort';

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

        if (isComplete) {
            return state;
        }

        const mergeSet = this.findNextMergeSet(state.mergeTree);

        if (mergeSet === null) {
            isComplete = true;
            return { ...state, isComplete: true };
        }
        
        mergeSet.merge();

        if (compare(mergeTree.array, array)) {
            return this.step({...state, mergeTree});
        }

        array = [...mergeTree.array];

        return {...state, array, isComplete, mergeTree};
    }

    private findNextMergeSet(node: MergeSet): MergeSet | null {
        const nodes = node.getNodeArray();
        const next = nodes.find(n => !n.isMerged);

        return next ? next : null;
    }
}