import { useState, useEffect } from "react";

const CHAR_WIDTH = 8.4;
const LINE_HEIGHT = 22.4;

export const useTerminalSize = (
  terminalRef: React.RefObject<HTMLElement | null>,
  isMaximized: boolean,
  customSize: { width: number | null; height: number | null }
) => {
  const [terminalSize, setTerminalSize] = useState({ cols: 80, rows: 24 });

  useEffect(() => {
    const calculateSize = () => {
      if (!terminalRef.current) return;

      const body = terminalRef.current.querySelector(".terminal-body");
      if (!body) return;

      const rect = body.getBoundingClientRect();
      const padding = 48;
      const availableWidth = rect.width - padding;
      const availableHeight = rect.height - padding;

      const cols = Math.floor(availableWidth / CHAR_WIDTH);
      const rows = Math.floor(availableHeight / LINE_HEIGHT);

      setTerminalSize({
        cols: Math.max(40, cols),
        rows: Math.max(10, rows),
      });
    };

    calculateSize();

    const observer = new ResizeObserver(calculateSize);
    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    window.addEventListener("resize", calculateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateSize);
    };
  }, [terminalRef, isMaximized, customSize]);

  return terminalSize;
};
