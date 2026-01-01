import { useEffect, useState, type ReactNode } from "react";

type TerminalLineProps = {
  children: ReactNode;
  delay?: number;
};

export const TerminalLine = ({ children, delay = 0 }: TerminalLineProps) => {
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!visible) return null;

  return <div>{children}</div>;
};
