import { describe, it, expect } from 'vitest';
import { shift, swap } from './arrays';

describe('swap', () => {
    it('swaps two elements in an array', () => {
        // Setup
        const array = [1, 2, 3, 4, 5];

        // Execute
        const result = swap(array, 1, 3);

        // Assert
        expect(result).toEqual([1, 4, 3, 2, 5]);
    });

    it('returns the same array if indices are the same', () => {
        // Setup
        const array = [1, 2, 3, 4, 5];

        // Execute
        const result = swap(array, 1, 1);

        // Assert
        expect(result).toBe(array);
    });

    it('swaps two elements when first index is greater than second', () => {
        // Setup
        const array = [1, 2, 3, 4, 5];  

        // Execute
        const result = swap(array, 3, 1);

        // Assert
        expect(result).toEqual([1, 4, 3, 2, 5]);
    });

    it('handles swapping first and last elements', () => {
        // Setup
        const array = [1, 2, 3, 4, 5];

        // Execute
        const result = swap(array, 0, 4);

        // Assert
        expect(result).toEqual([5, 2, 3, 4, 1]);
    });

    it('handles swapping adjacent elements', () => {
        // Setup
        const array = [1, 2, 3, 4, 5];

        // Execute
        const result = swap(array, 1, 2);

        // Assert
        expect(result).toEqual([1, 3, 2, 4, 5]);
    });

    it('throws error for empty array', () => {
        // Setup
        const array: number[] = [];

        // Execute & Assert
        expect(() => swap(array, 0, 1)).toThrowError("swap: Indices are out of bounds.");
    });

    it('throws error for out-of-bounds indices', () => {
        // Setup
        const array = [1, 2, 3];

        // Assert
        expect(() => swap(array, -1, 4)).toThrowError("swap: Indices are out of bounds.");
    });

});

describe('shift', () => {
    it('shifts an element to the right', () => {
        // Setup
        const array = [1, 2, 3, 4, 5];
        // Execute
        const result = shift(array, 1, 3);
        // Assert
        expect(result).toEqual([1, 3, 4, 2, 5]);
    });   
    
    it('shifts an element to the left', () => {
        // Setup
        const array = [1, 2, 3, 4, 5];
        // Execute
        const result = shift(array, 3, 1);
        // Assert
        expect(result).toEqual([1, 4, 2, 3, 5]);
    });

    it('returns the same array if indices are the same', () => {
        // Setup
        const array = [1, 2, 3, 4, 5];
        // Execute
        const result = shift(array, 2, 2);
        // Assert
        expect(result).toBe(array);
    });

    it('throws error for out-of-bounds indices', () => {
        // Setup
        const array = [1, 2, 3];
        // Assert
        expect(() => shift(array, -1, 2)).toThrowError("shift: Indices are out of bounds.");
        expect(() => shift(array, 1, 3)).toThrowError("shift: Indices are out of bounds.");
    });
})