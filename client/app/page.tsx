"use client";

import { useDraw } from "@/hooks/useDraw";
import { drawLine } from "@/utils/drawLine";
import { FC, useState } from "react";
import { ChromePicker } from "react-color";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");


interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);


  function createLine({prevPoint , currentPoint, ctx} : Draw){
    socket.emit('draw-line', ({prevPoint, currentPoint, color}));
    drawLine({prevPoint, currentPoint, ctx, color});
  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button
          type="button"
          className="p-2 rounded-md border border-black"
          onClick={clear}
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
