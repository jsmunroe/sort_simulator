export type SortState = {
    array: number[];
    isComplete: boolean;
}

export default interface ISortAlgorithm {
    name: string;
    createState(array: number[]): SortState;
    step(state: SortState): SortState;
}