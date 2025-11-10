export default class NodeShift {
    readonly fromIndex: number;
    readonly toIndex: number;

    constructor(fromIndex: number, toIndex: number) {
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
    }

    static computeShifts(start: number[], end: number[]): NodeShift[] {
        const shifts: NodeShift[] = [];

        for(let i = 0; i < Math.min(start.length, end.length); i++) {
            const startValue = start[i];
            const endIndex = end.findIndex(v => v === startValue);

            if (endIndex === -1 || endIndex === i) {
                continue;
            }

            shifts.push(new NodeShift(i, endIndex));
        }

        return shifts;
    }
}