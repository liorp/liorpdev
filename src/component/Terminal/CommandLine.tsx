import { useEffect, useState, type ReactNode } from "react";
import { Prompt } from "./Prompt";
import { KNOWN_COMMANDS } from "../../const";

const DEFAULT_TYPING_SPEED = 30;

const highlightCommand = (input: string): ReactNode => {
  if (!input) return null;
  const parts = input.split(/(\s+)/);
  const cmd = parts[0]?.toLowerCase();
  const isKnown = KNOWN_COMMANDS.includes(cmd);

  return (
    <>
      <span className={isKnown ? "text-[#00ff41]" : "text-[#e4e4e7]"}>{parts[0]}</span>
      <span className="text-[#e4e4e7]">{parts.slice(1).join("")}</span>
    </>
  );
};

type CommandLineProps = {
  command: string;
  delay?: number;
  typingDelay?: number;
  typingSpeed?: number;
  cursorUntil?: number;
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
    setShowCursor(true);
    if (typingDelay > 0) {
      const timer = setTimeout(() => setTypingStarted(true), typingDelay);
      return () => clearTimeout(timer);
    }
  }, [visible, typingDelay]);

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
      {highlightCommand(displayedCommand)}
      {showCursor && <span className={isTyping ? "cursor cursor-solid" : "cursor"} />}
    </div>
  );
};
