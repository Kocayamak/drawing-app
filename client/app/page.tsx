"use client";

import { useDraw } from "@/hooks/useDraw";
import { drawLine } from "@/utils/drawLine";
import { FC, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  type DrawLineProps = {
    prevPoint: Point | null;
    currentPoint: Point;
    color: string;
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    socket.on(
      "draw-line",
      ({ prevPoint, currentPoint, color }: DrawLineProps) => {
        if (!ctx) return;
        drawLine({ prevPoint, currentPoint, ctx, color });
      }
    );

    socket.on("clear", clear);
  }, [canvasRef]);

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("draw-line", { prevPoint, currentPoint, color });
    drawLine({ prevPoint, currentPoint, ctx, color });
  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button
          type="button"
          className="p-2 rounded-md border border-black"
          onClick={() => socket.emit("clear")}
        >
          Panoyu Temizle
        </button>
      </div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={750}
        height={750}
        className="border border-black rounded-md"
      />
    </div>
  );
};

export default Page;
