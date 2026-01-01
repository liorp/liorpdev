import { useEffect, useState, type ReactNode } from "react";

type SectionHeaderProps = {
  children: ReactNode;
  delay?: number;
};

export const SectionHeader = ({ children, delay = 0 }: SectionHeaderProps) => {
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="section-header">
      {"// "}
      {children}
    </div>
  );
};
