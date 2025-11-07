export default class MergeSet {
    readonly start: number;
    readonly length: number;
    private _array: number[];

    get array(): number[] {
        return [...this._array];
    }

    readonly left: MergeSet | null = null;
    readonly right: MergeSet | null = null;

    parent: MergeSet | null = null;

    isMerged: boolean = false;

    private leftArray: number[] | null = null;
    private rightArray: number[] | null = null;
    private mergedArray: number[] | null = null;

    constructor(array: number[], start: number, length: number) {
        this.start = start;
        this.length = length;
        this._array = array.slice(start, start + length);

        if (length > 1) {
            const mid = Math.floor(length / 2);

            this.left = new MergeSet(array, start, mid);
            this.left.parent = this;

            this.right = new MergeSet(array, start + mid, length - mid);
            this.right.parent = this;
        }
        else {
            this.isMerged = true; // MergeSet has only one element
        }
    }

    merge(): number[] {
        if (this._array.length <= 1 || this.isMerged) {
            return this._array;
        }

        this.leftArray ??= this.left!.merge();
        this.rightArray ??= this.right!.merge();

        this.mergedArray ??= [];

        if (this.rightArray.length === 0 || this.leftArray[0] <= this.rightArray[0]) {
            this.mergedArray.push(this.leftArray[0]);
            this.leftArray.shift();
        } 
        else if (this.leftArray.length === 0 || this.rightArray[0] < this.leftArray[0]) {
            this.mergedArray.push(this.rightArray[0]);
            this.rightArray.shift();
        }

        if (this.leftArray.length === 0 && this.rightArray.length === 0) {
            this.isMerged = true;
            this._array = [...this.mergedArray];

            this.leftArray = null;
            this.rightArray = null;
            this.mergedArray = null;
        }
        else {
            this.isMerged = false;
            this._array = [...this.mergedArray, ...this.leftArray, ...this.rightArray];
        }


        this.integrateMergedChild(this);
        return this._array;
    }

    getNodeArray(): MergeSet[] {
        const layers: MergeSet[][] = [];

        this.getLayeredNodes(this, layers, 0);

        let nodes: MergeSet[] = [];

        for (const layer of layers.toReversed()) {
            nodes = [...nodes, ...layer];
        }

        return nodes;
    }

    toJSON() {
        return { 
            ...this,
            parent: null,
        };
    }

    getLayeredNodes(node: MergeSet, layers: MergeSet[][], depth: number) {
        if (layers.length <= depth) {
            layers.push([]);
        }

        layers[depth].push(node);

        if (node.left) {
            this.getLayeredNodes(node.left, layers, depth + 1);
        }
        
        if (node.right) {
            this.getLayeredNodes(node.right, layers, depth + 1);
        }
    }

    private integrateMergedChild(child: MergeSet) {
        this._array = [
            ...this._array.slice(0, child.start - this.start),
            ...child.array,
            ...this._array.slice(child.start - this.start + child.length)
        ];

        child.parent?.integrateMergedChild(this);
    }
}

