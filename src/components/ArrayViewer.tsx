import { useEffect, useRef } from "react";
import { getStyles } from "../utils/styles";
import type { SortState } from "../contracts/ISortAlgorithm";

type ArrayViewerProps = {
    state: SortState;
}

export default function ArrayViewer({ state }: ArrayViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const { array } = state;

        const currentIndex = ('currentIndex' in state && typeof state.currentIndex === 'number') ? state.currentIndex : -1;

        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const barStyle = getStyles('.bar');
        const fillStyle = barStyle.backgroundColor ?? (isDarkMode ? '#ffffff' : '#000000');

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const barWidth = ctx.canvas.width / array.length
        const maxValue = Math.max(...array);
        array.forEach((value, index) => {
            const barHeight = (value / maxValue) * ctx.canvas.height;
            ctx.fillStyle = currentIndex === index ? 'lime' : fillStyle;
            ctx.fillRect(index * barWidth + 1, ctx.canvas.height - barHeight, barWidth - 2, barHeight);
        });

    }, [state]);

    return (
        <canvas width={500} height={500} ref={canvasRef}/>
    );
}