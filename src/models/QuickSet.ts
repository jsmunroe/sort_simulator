import { swapInPlace } from "../utils/arrays";

export default class QuickSet {
    array: number[];
    low: number;
    high: number;

    left: QuickSet | null = null;
    right: QuickSet | null = null;

    isPartitioned: boolean = false;

    private pivot: number
    private i: number;
    private j: number;

    constructor(array: number[], low: number, high: number) {
        this.array = array;
        this.low = low;
        this.high = high;

        this.pivot = this.array[high];
        this.i = low - 1;
        this.j = low;
    }

    step(): boolean {
        if (this.low >= this.high) {
            this.isPartitioned = true;
            return true;
        }

        if (this.j < this.high) {
            if (this.array[this.j] < this.pivot) {
                this.i++;
                swapInPlace(this.array, this.i, this.j);
            }
            this.j++;

            return false;
        }

        if (this.j === this.high) {
            swapInPlace(this.array, this.i + 1, this.high);
            
            const pi = this.i + 1;
            
            this.left = new QuickSet(this.array, this.low, pi - 1);
            this.right = new QuickSet(this.array, pi + 1, this.high);

            this.j++;
        }
        
        if (this.left && !this.left.isPartitioned) {
            this.left.step();
            return false;
        }

        if (this.right && !this.right.isPartitioned) {
            this.right.step();
            return false;
        }

        this.isPartitioned = true;

        return true;
    }
}