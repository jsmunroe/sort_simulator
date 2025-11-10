import { useEffect, useRef, useState } from "react";
import type { SortState } from "../contracts/ISortAlgorithm";
import { getStylesForClass } from "../utils/styles";
import NodeShift from "../models/NodeShift";

type HistoryViewerProps = {
    history: SortState[];
}

export default function HistoryViewer({ history }: HistoryViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [nodeStyles] = useState(() => getStylesForClass('node'));
    const [isDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const rowHeight = 30;
        ctx.canvas.height = history.length * rowHeight;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let i = 0; i < history.length; i++) {
            const state = history[i];
            const { array } = state;

            ctx.fillStyle = nodeStyles.backgroundColor ?? (isDarkMode ? '#ffffff' : '#000000');;

            const nodeWidth = Math.min(30, ctx.canvas.width / array.length);

            ctx.beginPath();
            for (let j = 0; j < array.length; j++) {
                ctx.ellipse(
                    j * nodeWidth + nodeWidth / 2,
                    i * rowHeight + rowHeight / 2, 2, 2, 0, 0, Math.PI * 2);
            }
            ctx.fill();

            if (i === 0) {
                continue;
            }

            const {array: formerArray} = history[i - 1];
            const nodeShifts = NodeShift.computeShifts(formerArray, array);

            for (const shift of nodeShifts) {
                ctx.beginPath();
                ctx.moveTo(
                    shift.fromIndex * nodeWidth + nodeWidth / 2,
                    (i - 1) * rowHeight + rowHeight / 2 + 3);
                ctx.lineTo(
                    shift.toIndex * nodeWidth + nodeWidth / 2,
                    i * rowHeight + rowHeight / 2 - 3);
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        const scrollParent = canvasRef.current?.parentElement;
        if (scrollParent) {
            scrollParent.scrollTop = scrollParent.scrollHeight;
        }

    }, [history]);
    
    return (
        <div className="canvas-container">
            <canvas width={1000} height={500} ref={canvasRef}/>
        </div>
    );
}