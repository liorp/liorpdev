import { useState, useRef, useCallback, useEffect } from "react";

export const useResizable = (minWidth = 400, minHeight = 300) => {
  const [size, setSize] = useState<{ width: number | null; height: number | null }>({
    width: null,
    height: null,
  });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{
    edge: string;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const handleResizeStart = useCallback((edge: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = (e.target as HTMLElement).closest(".terminal-window") as HTMLElement;
    if (!target) return;

    setIsResizing(true);
    resizeRef.current = {
      edge,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: target.offsetWidth,
      startHeight: target.offsetHeight,
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeRef.current) return;

      const { edge, startX, startY, startWidth, startHeight } = resizeRef.current;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (edge.includes("e")) newWidth = Math.max(minWidth, startWidth + deltaX);
      if (edge.includes("w")) newWidth = Math.max(minWidth, startWidth - deltaX);
      if (edge.includes("s")) newHeight = Math.max(minHeight, startHeight + deltaY);
      if (edge.includes("n")) newHeight = Math.max(minHeight, startHeight - deltaY);

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeRef.current = null;
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, minWidth, minHeight]);

  const resetSize = useCallback(() => {
    setSize({ width: null, height: null });
  }, []);

  return { size, isResizing, handleResizeStart, resetSize };
};
