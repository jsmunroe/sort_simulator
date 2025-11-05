export type SortState = {
    array: number[];
    isComplete: boolean;
}

export default interface ISortAlgorithm {
    createState(array: number[]): SortState;
    step(state: SortState): SortState;
}