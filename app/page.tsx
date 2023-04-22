'use client'

import { useDraw } from "@/hooks/useDraw";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { canvasRef } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx } : Draw){

  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <canvas ref={canvasRef} width={750} height={750} className="border border-black rounded-md" />

    </div>
  );
};

export default Page;
