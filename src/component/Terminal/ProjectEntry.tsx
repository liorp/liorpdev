import { useEffect, useState } from "react";

type ProjectEntryProps = {
  name: string;
  description: string;
  url?: string;
  delay?: number;
  onClick?: () => void;
};

export const ProjectEntry = ({
  name,
  description,
  url,
  delay = 0,
  onClick,
}: ProjectEntryProps) => {
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!visible) return null;

  const content = (
    <>
      <div className="flex items-center gap-3">
        <span className="text-[#00ff41]">{">"}</span>
        <span className="project-name">{name}</span>
      </div>
      <div className="project-desc ml-6">{description}</div>
      {url && <div className="project-link ml-6 mt-1">{url}</div>}
    </>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="project-entry block">
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="project-entry block w-full text-left cursor-pointer"
    >
      {content}
    </button>
  );
};
