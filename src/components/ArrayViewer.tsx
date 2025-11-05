import { useEffect, useRef } from "react";

type ArrayViewerProps = {
    array: number[];
}

export default function ArrayViewer({ array }: ArrayViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const drawArray = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            const barWidth = ctx.canvas.width / array.length
            const maxValue = Math.max(...array);
            array.forEach((value, index) => {
                const barHeight = (value / maxValue) * ctx.canvas.height;
                ctx.fillStyle = "white";
                ctx.fillRect(index * barWidth + 1, ctx.canvas.height - barHeight, barWidth - 2, barHeight);
            });
        };

        drawArray();
    }, [array]);

    return (
        <canvas width={500} height={500} ref={canvasRef}/>
    );
}