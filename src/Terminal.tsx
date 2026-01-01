import { useEffect, useState, type ReactNode } from "react";

const DEFAULT_TYPING_SPEED = 30;

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

export const Prompt = () => (
  <span className="prompt">
    <span className="prompt-user">lior</span>
    <span className="prompt-at">@</span>
    <span className="prompt-host">dev</span>
    <span className="prompt-at">:</span>
    <span className="prompt-path">~</span>
    <span className="prompt-symbol">$</span>{" "}
  </span>
);

type CommandLineProps = {
  command: string;
  delay?: number;
  typingSpeed?: number;
};

export const CommandLine = ({
  command,
  delay = 0,
  typingSpeed = DEFAULT_TYPING_SPEED,
}: CommandLineProps) => {
  const [visible, setVisible] = useState(delay === 0);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  useEffect(() => {
    if (!visible) return;

    let index = 0;
    setDisplayedCommand("");
    setTypingDone(false);

    const interval = setInterval(() => {
      if (index < command.length) {
        index++;
        setDisplayedCommand(command.slice(0, index));
      } else {
        setTypingDone(true);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [visible, command, typingSpeed]);

  if (!visible) return null;

  return (
    <div className="mb-1">
      <Prompt />
      <span className="text-[#e4e4e7]">{displayedCommand}</span>
      {!typingDone && <span className="cursor" />}
    </div>
  );
};

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

  const ascii = `
  ██╗     ██╗ ██████╗ ██████╗
  ██║     ██║██╔═══██╗██╔══██╗
  ██║     ██║██║   ██║██████╔╝
  ██║     ██║██║   ██║██╔══██╗
  ███████╗██║╚██████╔╝██║  ██║
  ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝
`;

  return (
    <pre className="ascii-art text-center my-6 terminal-glow">{ascii}</pre>
  );
};

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
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="project-entry block"
      >
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

export const SkillTag = ({ children }: { children: ReactNode }) => (
  <span className="skill-tag">{children}</span>
);

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
