import { useEffect, useState } from "react";
import { LIOR_ASCII } from "../../const";

type AsciiArtProps = {
  delay?: number;
};

export const AsciiArt = ({ delay = 0 }: AsciiArtProps) => {
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!visible) return null;

  return <pre className="ascii-art text-center my-6 terminal-glow">{LIOR_ASCII}</pre>;
};
