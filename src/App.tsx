import { useEffect, useState, useRef } from "react";
import {
  AsciiArt,
  CommandLine,
  MatrixRain,
  ProjectEntry,
  SkillTag,
  TerminalLine,
} from "./component";
import { useDraggable, useResizable, useTerminalSize, useKonami } from "./hook";
import {
  projects,
  skills,
  socialLinks,
  TYPING_SPEED,
  CMD_NEOFETCH,
  CMD_CAT,
  CMD_SKILLS,
  CMD_PROJECTS,
  CMD_CONNECT,
  TIMING,
} from "./const";
import { getCommandOutput, highlightCommand } from "./util";

declare global {
  interface Window {
    klaro: { show: (arg1: undefined, arg2: boolean) => void };
    adsbygoogle: unknown[];
  }
}

type HistoryEntry = {
  command: string;
  output: React.ReactNode;
};

const App = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const { position, isDragging, handleMouseDown, resetPosition } = useDraggable(isMaximized);
  const { size, isResizing, handleResizeStart, resetSize } = useResizable();
  const terminalSize = useTerminalSize(terminalRef, isMaximized, size);

  useEffect(() => {
    if (!terminalBodyRef.current) return;

    const scrollToBottom = () => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    };

    const observer = new MutationObserver(scrollToBottom);
    observer.observe(terminalBodyRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  const handleTerminalClick = () => {
    if (animationComplete && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = userInput.trim();

      if (!cmd) {
        setCommandHistory((prev) => [...prev, { command: "", output: null }]);
        setUserInput("");
        return;
      }

      const output = getCommandOutput(cmd);

      if (output === "__CLEAR__") {
        setCommandHistory([]);
      } else if (output === "__HISTORY__") {
        const historyOutput = (
          <div className="text-[#888]">
            {commandHistory.map((entry, i) => (
              <div key={i}>
                {i + 1} {entry.command}
              </div>
            ))}
            <div>{commandHistory.length + 1} history</div>
          </div>
        );
        setCommandHistory((prev) => [...prev, { command: "history", output: historyOutput }]);
      } else {
        setCommandHistory((prev) => [...prev, { command: userInput, output }]);
      }
      setUserInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setUserInput(commandHistory[commandHistory.length - 1 - newIndex]?.command || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setUserInput(commandHistory[commandHistory.length - 1 - newIndex]?.command || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setUserInput("");
      }
    }
  };

  useKonami(() => setShowEasterEgg((v) => !v));

  const handleClose = () => {
    // Disabled
  };

  const handleMinimize = () => {
    // Disabled
  };

  const handleMaximize = () => {
    setIsMaximized((v) => !v);
    if (!isMaximized) {
      resetPosition();
      resetSize();
    }
  };

  const handleHeaderDoubleClick = () => {
    handleMaximize();
  };

  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), TIMING.cursor);
    return () => clearTimeout(timer);
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="profile-behind">
        <img src="/profile-photo.webp" alt="Lior Polak" />
      </div>

      <div className="terminal-container crt-flicker">
        <MatrixRain />

        <div className="h-full w-full flex flex-col items-center justify-center relative z-10">
          <div
            ref={terminalRef}
            className={`terminal-window ${isMaximized ? "terminal-maximized" : ""} ${isHidden ? "terminal-hidden" : ""} ${isResizing ? "terminal-resizing" : ""}`}
            style={
              !isMaximized
                ? {
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: isDragging || isResizing ? "none" : "transform 0.1s ease-out",
                    ...(size.width && { width: size.width }),
                    ...(size.height && { height: size.height }),
                  }
                : undefined
            }
          >
            {!isMaximized && (
              <>
                <div className="resize-handle resize-n" onMouseDown={(e) => handleResizeStart("n", e)} />
                <div className="resize-handle resize-s" onMouseDown={(e) => handleResizeStart("s", e)} />
                <div className="resize-handle resize-e" onMouseDown={(e) => handleResizeStart("e", e)} />
                <div className="resize-handle resize-w" onMouseDown={(e) => handleResizeStart("w", e)} />
                <div className="resize-handle resize-ne" onMouseDown={(e) => handleResizeStart("ne", e)} />
                <div className="resize-handle resize-nw" onMouseDown={(e) => handleResizeStart("nw", e)} />
                <div className="resize-handle resize-se" onMouseDown={(e) => handleResizeStart("se", e)} />
                <div className="resize-handle resize-sw" onMouseDown={(e) => handleResizeStart("sw", e)} />
              </>
            )}

            <div
              className={`terminal-header ${!isMaximized ? "terminal-draggable" : ""}`}
              onMouseDown={handleMouseDown}
              onDoubleClick={handleHeaderDoubleClick}
            >
              <button type="button" className="terminal-btn terminal-btn-close" onClick={handleClose} aria-label="Close" />
              <button type="button" className="terminal-btn terminal-btn-minimize" onClick={handleMinimize} aria-label="Minimize" />
              <button type="button" className="terminal-btn terminal-btn-maximize" onClick={handleMaximize} aria-label="Maximize" />
              <div className="terminal-title">
                lior@dev:~ -- bash -- {terminalSize.cols}x{terminalSize.rows}
              </div>
            </div>

            <div
              ref={terminalBodyRef}
              className={`terminal-body ${isMinimized ? "terminal-body-minimized" : ""}`}
              onClick={handleTerminalClick}
            >
              <div className="mb-6">
                <TerminalLine delay={TIMING.lastLogin}>
                  <span className="text-[#666]">
                    Last login: {currentDate} {currentTime} on ttys001
                  </span>
                </TerminalLine>

                <CommandLine
                  command={CMD_NEOFETCH}
                  delay={TIMING.neofetchCmd}
                  typingDelay={TIMING.neofetchTypingDelay}
                  typingSpeed={TYPING_SPEED}
                  cursorUntil={TIMING.neofetchAscii}
                />

                <TerminalLine delay={TIMING.neofetchAscii}>
                  <div className="mt-4">
                    <AsciiArt />
                  </div>
                </TerminalLine>

                <TerminalLine delay={TIMING.neofetchMeta}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 mt-4 text-sm">
                    <div>
                      <span className="text-[#ffb000]">OS:</span> <span className="text-[#888]">Human v2.0</span>
                    </div>
                    <div>
                      <span className="text-[#ffb000]">Role:</span> <span className="text-[#888]">Software Engineer</span>
                    </div>
                    <div>
                      <span className="text-[#ffb000]">Shell:</span> <span className="text-[#888]">zsh 5.9</span>
                    </div>
                    <div>
                      <span className="text-[#ffb000]">Specialty:</span> <span className="text-[#888]">AI Agents Manager</span>
                    </div>
                    <div>
                      <span className="text-[#ffb000]">Uptime:</span> <span className="text-[#888]">20+ years</span>
                    </div>
                    <div>
                      <span className="text-[#ffb000]">Status:</span>{" "}
                      <span className="status-online">
                        <span className="status-dot" />
                        Online
                      </span>
                    </div>
                  </div>
                </TerminalLine>
              </div>

              <CommandLine
                command={CMD_CAT}
                delay={TIMING.catCmd}
                typingDelay={TIMING.catTypingDelay}
                typingSpeed={TYPING_SPEED}
                cursorUntil={TIMING.catOutput}
              />

              <TerminalLine delay={TIMING.catOutput}>
                <div className="command-output text-[#888] leading-relaxed">
                  Building at the intersection of <span className="text-[#00ff41]">AI</span> and{" "}
                  <span className="text-[#00ff41]">software engineering</span>.
                  <br />I specialize in scalable systems - from microservices architecture to ML pipelines.
                  <br />
                  Open source contributor. Problem solver. Lifelong learner.
                </div>
              </TerminalLine>

              <CommandLine
                command={CMD_SKILLS}
                delay={TIMING.skillsCmd}
                typingDelay={TIMING.skillsTypingDelay}
                typingSpeed={TYPING_SPEED}
                cursorUntil={TIMING.skillsOutput}
              />

              <TerminalLine delay={TIMING.skillsOutput}>
                <div className="command-output flex flex-wrap gap-1 mt-2">
                  {skills.map((skill) => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </div>
              </TerminalLine>

              <CommandLine
                command={CMD_PROJECTS}
                delay={TIMING.projectsCmd}
                typingDelay={TIMING.projectsTypingDelay}
                typingSpeed={TYPING_SPEED}
                cursorUntil={TIMING.projectsOutput}
              />

              <div className="command-output grid grid-cols-2 gap-x-6 gap-y-1">
                {projects.map((project, index) => (
                  <ProjectEntry
                    key={project.name}
                    name={project.name}
                    description={project.description}
                    url={project.url}
                    delay={TIMING.projectsOutput + index * 50}
                  />
                ))}
                <ProjectEntry
                  name="analytics"
                  description="Privacy preferences - manage your data settings"
                  onClick={() => window.klaro?.show(undefined, true)}
                  delay={TIMING.projectsOutput + projects.length * 50}
                />
              </div>

              <CommandLine
                command={CMD_CONNECT}
                delay={TIMING.connectCmd}
                typingDelay={TIMING.connectTypingDelay}
                typingSpeed={TYPING_SPEED}
                cursorUntil={TIMING.connectOutput}
              />

              <TerminalLine delay={TIMING.connectOutput}>
                <div className="command-output flex gap-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00ffff] hover:text-[#00ff41] transition-all glitch"
                    >
                      [{link.icon}] {link.name}
                    </a>
                  ))}
                </div>
              </TerminalLine>

              <TerminalLine delay={TIMING.hint}>
                <div className="mt-6 text-[#333] text-xs">hint: try the konami code</div>
              </TerminalLine>

              {showEasterEgg && (
                <TerminalLine>
                  <div className="mt-4 p-4 border border-[#ff3333] bg-[#ff333310]">
                    <span className="text-[#ff3333]">[ACHIEVEMENT UNLOCKED]</span>
                    <br />
                    <span className="text-[#888]">You found the secret! You're clearly someone who pays attention to details.</span>
                  </div>
                </TerminalLine>
              )}

              {commandHistory.map((entry, index) => (
                <div key={index} className="mb-2">
                  <div>
                    <span className="prompt">
                      <span className="prompt-user">lior</span>
                      <span className="prompt-at">@</span>
                      <span className="prompt-host">dev</span>
                      <span className="prompt-at">:</span>
                      <span className="prompt-path">~</span>
                      <span className="prompt-symbol">$</span>
                    </span>{" "}
                    {highlightCommand(entry.command)}
                  </div>
                  {entry.output && <div className="mt-1 ml-0">{entry.output}</div>}
                </div>
              ))}

              <TerminalLine delay={TIMING.cursor}>
                <div className="mt-6">
                  <span className="prompt">
                    <span className="prompt-user">lior</span>
                    <span className="prompt-at">@</span>
                    <span className="prompt-host">dev</span>
                    <span className="prompt-at">:</span>
                    <span className="prompt-path">~</span>
                    <span className="prompt-symbol">$</span>
                  </span>{" "}
                  {animationComplete && (
                    <>
                      {highlightCommand(userInput)}
                      <span className="cursor" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="terminal-input"
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </>
                  )}
                </div>
              </TerminalLine>
            </div>

            <div className={`terminal-footer ${isMinimized ? "terminal-footer-minimized" : ""}`}>
              <span>PID: 1337</span>
              <span>CPU: 3.14%</span>
              <span>MEM: 42.0%</span>
              <span>
                {currentDate} {currentTime}
              </span>
            </div>
          </div>

          <ins
            className="adsbygoogle w-full max-w-sm mx-auto mt-8 block"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4529248472834919"
            data-ad-slot="6061011972"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />

          <div className="text-center mt-8 text-[#333] text-xs">
            <span className="text-[#444]">{">"}</span> Crafted with <span className="text-[#ff3333]">{"<3"}</span> using React +
            TypeScript
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
