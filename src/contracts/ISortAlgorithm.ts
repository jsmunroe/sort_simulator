export type SortState = {
    name: string;
    array: number[];
    isComplete: boolean;
}

export default interface ISortAlgorithm {
    name: string;
    createState(array: number[]): SortState;
    step(state: SortState): SortState;
    isValidState(state: SortState): state is SortState;
}