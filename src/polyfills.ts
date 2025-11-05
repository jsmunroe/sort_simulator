declare global {
    interface Array<T> {
        toReversed(): T[];
    }
}

if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function <T>(this: T[]): T[] {
    return [...this].reverse();
  };
}