import { useEffect, useRef } from "react";
import { getStylesForClass } from "../utils/styles";
import type { SortState } from "../contracts/ISortAlgorithm";

type ArrayViewerProps = {
    state: SortState;
}

export default function ArrayViewer({ state }: ArrayViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawView(ctx, state);

    }, [state]);

    return (
        <canvas width={500} height={500} ref={canvasRef}/>
    );
}

function drawView(ctx: CanvasRenderingContext2D, state: SortState) {
    const stepStyles = getStylesForClass('step');
    const barStyles = getStylesForClass('bar');

    const { array } = state;

    const currentIndex = ('currentIndex' in state && typeof state.currentIndex === 'number') ? state.currentIndex : -1;

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    ctx.fillStyle = barStyles.backgroundColor ?? (isDarkMode ? '#ffffff' : '#000000');
    drawArray(ctx, array, currentIndex);

    if ('accumulations' in state && Array.isArray(state.accumulations)) {
        const accumulationsStyles = getStylesForClass('accumulations-bar');
        ctx.fillStyle = accumulationsStyles.backgroundColor ?? (isDarkMode ? '#888888' : '#444444');
        drawArray(ctx, state.accumulations, -1, 150);
    }

    if ('counts' in state && Array.isArray(state.counts)) {
        const countsStyles = getStylesForClass('counts-bar');
        ctx.fillStyle = countsStyles.backgroundColor ?? (isDarkMode ? '#888888' : '#444444');
        drawArray(ctx, state.counts, -1, 100);
    }

    if ('buckets' in state && Array.isArray(state.buckets) && state.buckets.every(n => Array.isArray(n))) {
        const bucketStyles = getStylesForClass('buckets');
        ctx.fillStyle = bucketStyles.backgroundColor ?? (isDarkMode ? '#888888' : '#444444');
        const flattenedBuckets = (state.buckets as number[][]).flat();
        flattenedBuckets.unshift(...Array(array.length - flattenedBuckets.length).fill(0));
        drawArray(ctx, flattenedBuckets, -1);
    }

    if ('step' in state && typeof state.step === 'string' && state.step) {
        const step = state.step;

        ctx.font = '16px Arial';

        ctx.textBaseline = 'top';
        ctx.fillStyle = stepStyles.backgroundColor ?? (isDarkMode ? '#000000' : '#ffffff');
        ctx.beginPath();
        ctx.roundRect(5, 5, ctx.measureText(step).width + 16, 26, 3);
        ctx.fill();

        ctx.fillStyle = stepStyles.color ?? (isDarkMode ? '#ffffff' : '#000000');
        
        ctx.fillText(step, 12, 10);
    }
}

function drawArray(ctx: CanvasRenderingContext2D, array: number[], currentIndex?: number, max: number = -1) {
    const arrayViewerStyles = getStylesForClass('array-viewer');
    const fillStyle = ctx.fillStyle;
    const barWidth = ctx.canvas.width / array.length
    const maxValue = Math.max(max, ...array);

    for (let index = 0; index < array.length; index++) {
        const value = array[index];
        const barHeight = (value / maxValue) * ctx.canvas.height;
        ctx.fillStyle = arrayViewerStyles.backgroundColor ??'hsla(0, 0%, 0%, 0.0)';
        ctx.fillRect(index * barWidth, ctx.canvas.height - barHeight - 1, barWidth, barHeight);
        ctx.fillStyle = currentIndex === index ? 'lime' : fillStyle;
        ctx.fillRect(index * barWidth + 1, ctx.canvas.height - barHeight, barWidth - 2, barHeight);
    };
}