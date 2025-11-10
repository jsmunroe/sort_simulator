import { useRef } from "react";
import type { SortState } from "../contracts/ISortAlgorithm";
import { areEqual } from "../utils/arrays";

export default function useStateHistory() {
    const listRef = useRef<SortState[]>([]);
    const currentIndexRef = useRef<number>(-1);

    const getCurrent = () => listRef.current[currentIndexRef.current] ?? null;
    
    const getIsAtEnd = () => currentIndexRef.current >= listRef.current.length - 1;

    const push = (item: SortState) => {
        const current = getCurrent();
        if (current && areEqual(item.array, current?.array)) {
            return;
        }

        listRef.current.push(item);
        currentIndexRef.current = listRef.current.length - 1;
    }

    const pop = (): SortState | null => {
        return listRef.current.pop() ?? null;
    }

    const clear = () => {
        listRef.current = [];
        currentIndexRef.current = -1;
    }

    const next = () => {
        if (currentIndexRef.current < listRef.current.length - 1) {
            currentIndexRef.current += 1;
        }
    }

    const previous = () => {
        if (currentIndexRef.current > 0) {
            currentIndexRef.current -= 1;
        }
    }

    return { 
        get list() { return listRef.current; },
        get current() { return getCurrent(); },
        get currentIndex() { return currentIndexRef.current; },
        get isAtEnd() { return getIsAtEnd(); },
        push,
        pop, 
        next, 
        previous, 
        clear
    };
}