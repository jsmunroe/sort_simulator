import { useEffect, useState } from 'react';
import type ISortAlgorithm from '../contracts/ISortAlgorithm';
import type { SortState } from '../contracts/ISortAlgorithm';

export default function useAlgorithm(algorithm: ISortAlgorithm, array: number[]) {
    const [state, setState] = useState(() => algorithm.createState(array));

    useEffect(() => {
        setState(algorithm.createState(array));
    }, [algorithm])

    const doStep = (state: SortState) => {
        const newState = algorithm.step(state);

        if (newState.isComplete || state === newState) {
            return newState;
        }

        const stateJson = JSON.stringify(state);
        const newStateJson = JSON.stringify(newState);

        try {
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
        }
        catch (e) {
            console.error("Error during state comparison:", e);
        }

        return newState;
    }

    const step = () => {
        setState((prevState) => doStep(prevState));
    }

    const reset = () => {
        setState(algorithm.createState(array));
    }

    return { state, step, reset } as const;
}