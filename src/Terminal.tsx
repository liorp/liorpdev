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
  typingDelay?: number; // delay before typing starts (after prompt appears)
  typingSpeed?: number;
  cursorUntil?: number; // absolute time (from mount) when cursor should hide
};

export const CommandLine = ({
  command,
  delay = 0,
  typingDelay = 0,
  typingSpeed = DEFAULT_TYPING_SPEED,
  cursorUntil,
}: CommandLineProps) => {
  const [visible, setVisible] = useState(delay === 0);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [typingStarted, setTypingStarted] = useState(typingDelay === 0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    // Show cursor immediately when prompt appears
    setShowCursor(true);
    if (typingDelay > 0) {
      const timer = setTimeout(() => setTypingStarted(true), typingDelay);
      return () => clearTimeout(timer);
    }
  }, [visible, typingDelay]);

  // Hide cursor at cursorUntil time (when next element appears)
  useEffect(() => {
    if (cursorUntil === undefined) return;
    const timer = setTimeout(() => setShowCursor(false), cursorUntil);
    return () => clearTimeout(timer);
  }, [cursorUntil]);

  useEffect(() => {
    if (!visible || !typingStarted) return;

    let index = 0;
    setDisplayedCommand("");
    setShowCursor(true);
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < command.length) {
        index++;
        setDisplayedCommand(command.slice(0, index));
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [visible, typingStarted, command, typingSpeed]);

  if (!visible) return null;

  return (
    <div className="mb-1">
      <Prompt />
      <span className="text-[#e4e4e7]">{displayedCommand}</span>
      {showCursor && <span className={isTyping ? "cursor cursor-solid" : "cursor"} />}
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
