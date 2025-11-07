import { useEffect, useState } from 'react';
import type ISortAlgorithm from '../contracts/ISortAlgorithm';
import type { SortState } from '../contracts/ISortAlgorithm';
import { useList } from '.';

export default function useAlgorithm(algorithm: ISortAlgorithm, array: number[]) {
    const [state, setState] = useState(() => algorithm.createState(array));
    const stateHistory = useList<SortState>();

    useEffect(() => {
        setState(algorithm.createState(array));
    }, [algorithm])

    useEffect(() => {
        if (stateHistory.current) {
            setState(stateHistory.current!);
        }
    }, [stateHistory.currentIndex]);

    const doStep = (state: SortState) => {
        const newState = algorithm.step(state);

        if (newState.isComplete || state === newState) {
            return state;
        }

        const stateJson = JSON.stringify(state);
        const newStateJson = JSON.stringify(newState);

        if (!newState.isComplete && state !== newState && stateJson === newStateJson) {
            const error = new Error("Algorithm step did not change state.");
            console.error(error);
            algorithm.step(state); // For debugging purposes
            throw error;
        }

        const stateArrayJson = JSON.stringify(state.array);
        const newStateArrayJson = JSON.stringify(newState.array);

        if (stateArrayJson === newStateArrayJson) {
            const error = new Error("Algorithm step did not change array.");
            console.error(error);
            algorithm.step(state); // For debugging purposes
        }

        stateHistory.push(newState);
        stateHistory.next();
        return newState;
    }

    const next = () => {
        if (stateHistory.isAtEnd) {
            setState((prevState) => doStep(prevState));
        }
        else {
            stateHistory.next();
            setState(stateHistory.current!);
        }
    }

    const previous = () => {
        stateHistory.previous();
        setState(stateHistory.current!);
    }

    const reset = () => {
        setState(algorithm.createState(array));
        stateHistory.clear();
    }

    return { state, next, previous, reset } as const;
}