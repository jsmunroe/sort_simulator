import { useState } from 'react';
import type ISortAlgorithm from '../contracts/ISortAlgorithm';

export default function useAlgorithm(algorithm: ISortAlgorithm, array: number[]) {
    const [state, setState] = useState(() => algorithm.createState(array));

    const step = () => {
        setState((prevState) => algorithm.step(prevState));
    }

    return [state, step] as const;
}