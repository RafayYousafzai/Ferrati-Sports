"use client";

import { useDragScroll } from "@/hooks/use-drag-to-scroll";
import React from "react";

interface DraggableContainerProps {
  children: React.ReactNode;
}

export function DraggableContainer({ children }: DraggableContainerProps) {
  const scrollRef = useDragScroll<HTMLDivElement>();

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto space-x-8 pb-4 no-scrollbar"
    >
      {children}
    </div>
  );
}
