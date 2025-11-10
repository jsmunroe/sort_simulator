import { useEffect, useState } from 'react';
import type ISortAlgorithm from '../contracts/ISortAlgorithm';
import type { SortState } from '../contracts/ISortAlgorithm';
import {useStateHistory} from '.';

export default function useAlgorithm(algorithm: ISortAlgorithm, array: number[]) {
    const [state, setState] = useState(() => algorithm.createState(array));
    const stateHistory = useStateHistory();

    const getStateHistoryList = () => stateHistory.list.slice(0, stateHistory.currentIndex + 1);

    useEffect(() => {
        const newState = algorithm.createState(array);
        setState(newState);

        stateHistory.clear();
        stateHistory.push(newState);
        stateHistory.next();
    }, [algorithm])

    useEffect(() => {
        if (stateHistory.current) {
            setState(stateHistory.current!);
        }
    }, [stateHistory.currentIndex]);

    const doStep = (state: SortState) => {
        const newState = algorithm.step(state);

        stateHistory.push(newState);
        stateHistory.next();

        if (newState.isComplete || state === newState) {
            return newState;
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
        const newState = algorithm.createState(array);
        setState(newState);
        stateHistory.clear();
        stateHistory.push(newState);
        stateHistory.next();
    }

    return { 
        state, 
        get stateHistory() { return getStateHistoryList(); },
        next, 
        previous, 
        reset 
    } as const;
}