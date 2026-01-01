import { useEffect, useState, useRef, useCallback } from "react";
import {
  AsciiArt,
  CommandLine,
  ProjectEntry,
  SectionHeader,
  SkillTag,
  TerminalLine,
} from "./Terminal";
import { useKonami } from "./useKonami";

// Animation timing constants
const TYPING_SPEED = 30; // ms per character
const OUTPUT_DELAY = 100; // ms pause after command finishes

const getCommandDuration = (cmd: string) => cmd.length * TYPING_SPEED + OUTPUT_DELAY;

// Custom hook for draggable window
const useDraggable = (isMaximized: boolean) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };
  }, [isMaximized, position]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current) return;
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.initialX + deltaX,
        y: dragRef.current.initialY + deltaY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const resetPosition = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return { position, isDragging, handleMouseDown, resetPosition };
};

// Custom hook for resizable window
const useResizable = (minWidth = 400, minHeight = 300) => {
  const [size, setSize] = useState<{ width: number | null; height: number | null }>({ width: null, height: null });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{ edge: string; startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);

  const handleResizeStart = useCallback((edge: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = (e.target as HTMLElement).closest('.terminal-window') as HTMLElement;
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

      if (edge.includes('e')) newWidth = Math.max(minWidth, startWidth + deltaX);
      if (edge.includes('w')) newWidth = Math.max(minWidth, startWidth - deltaX);
      if (edge.includes('s')) newHeight = Math.max(minHeight, startHeight + deltaY);
      if (edge.includes('n')) newHeight = Math.max(minHeight, startHeight - deltaY);

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

// Custom hook for terminal size calculation
const useTerminalSize = (terminalRef: React.RefObject<HTMLElement | null>, isMaximized: boolean, customSize: { width: number | null; height: number | null }) => {
  const [terminalSize, setTerminalSize] = useState({ cols: 80, rows: 24 });
  const charWidth = 8.4; // Approximate width of monospace character at 14px
  const lineHeight = 22.4; // Line height at 14px font

  useEffect(() => {
    const calculateSize = () => {
      if (!terminalRef.current) return;

      const body = terminalRef.current.querySelector('.terminal-body');
      if (!body) return;

      const rect = body.getBoundingClientRect();
      const padding = 48; // 24px padding on each side
      const availableWidth = rect.width - padding;
      const availableHeight = rect.height - padding;

      const cols = Math.floor(availableWidth / charWidth);
      const rows = Math.floor(availableHeight / lineHeight);

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

declare global {
  interface Window {
    klaro: { show: (arg1: undefined, arg2: boolean) => void };
    adsbygoogle: unknown[];
  }
}

const projects = [
  {
    name: "blog",
    description: "Tech & AI thoughts - deep dives into software engineering",
    url: "https://blog.liorp.dev/",
  },
  {
    name: "milan",
    description: "Hebrew word game - daily puzzle challenge",
    url: "https://milan.liorp.dev/",
  },
  {
    name: "hzi",
    description: "Smart electricity calculator - optimize your energy usage",
    url: "https://hzi.liorp.dev/",
  },
  {
    name: "fireplace",
    description: "Retirement location finder - discover your ideal destination",
    url: "https://fireplace.liorp.dev/",
  },
  {
    name: "cmprsr",
    description: "Learn compression algorithms - interactive visualizations",
    url: "https://cmprsr.liorp.dev/",
  },
];

const skills = [
  "ML/AI",
  "LLMs",
  "Python",
  "TypeScript",
  "React",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
];

const socialLinks = [
  { name: "GitHub", url: "https://github.com/liorpdev", icon: "gh" },
  { name: "LinkedIn", url: "https://linkedin.com/in/liorpolak", icon: "in" },
  { name: "Twitter", url: "https://twitter.com/liorpdev", icon: "tw" },
];

const MatrixRain = () => {
  useEffect(() => {
    const chars = "01";
    const fontSize = 14;
    const columnCount = Math.floor(window.innerWidth / fontSize);
    const drops: number[] = Array(columnCount)
      .fill(0)
      .map(() => Math.random() * -100);

    const canvas = document.getElementById("matrix-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff4120";
      ctx.font = `${fontSize}px JetBrains Mono`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      id="matrix-canvas"
      className="matrix-bg"
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

// Calculate all animation timings
const CMD_NEOFETCH = "neofetch --ascii";
const CMD_CAT = "cat about.txt";
const CMD_SKILLS = "ls -la ./skills/";
const CMD_PROJECTS = "ls -la ./projects/";
const CMD_CONNECT = "ls -la ./connect/";

const SECTION_DELAY = 800; // ms pause before typing starts (prompt visible, cursor blinking)
const CMD_OUTPUT_DELAY = 1500; // ms pause after command finishes before output

// Build timing sequentially for clarity
const t1 = 100; // neofetch starts typing
const t2 = t1 + getCommandDuration(CMD_NEOFETCH) + CMD_OUTPUT_DELAY; // neofetch output + cat prompt appears
const t3 = t2 + SECTION_DELAY; // cat starts typing
const t4 = t3 + getCommandDuration(CMD_CAT) + CMD_OUTPUT_DELAY; // cat output + skills prompt appears
const t5 = t4 + SECTION_DELAY; // skills starts typing
const t6 = t5 + getCommandDuration(CMD_SKILLS) + CMD_OUTPUT_DELAY; // skills output + projects prompt appears
const t7 = t6 + SECTION_DELAY; // projects starts typing
const t8 = t7 + getCommandDuration(CMD_PROJECTS) + CMD_OUTPUT_DELAY; // projects output
const t9 = t8 + SECTION_DELAY; // connect section

const TIMING = {
  lastLogin: 0,
  neofetchCmd: t1,
  neofetchTypingDelay: 0,
  neofetchAscii: t2,
  neofetchMeta: t2 + 400, // metadata appears 400ms after ASCII
  catCmd: t2 + 400, // prompt appears with metadata (not ASCII)
  catTypingDelay: SECTION_DELAY,
  catOutput: t4,
  skillsCmd: t4, // prompt appears with cat output
  skillsTypingDelay: SECTION_DELAY,
  skillsOutput: t6,
  projectsCmd: t6, // prompt appears with skills output
  projectsTypingDelay: SECTION_DELAY,
  projectsOutput: t8,
  connectCmd: t8, // prompt appears with projects output
  connectTypingDelay: SECTION_DELAY,
  connectOutput: t9 + getCommandDuration(CMD_CONNECT) + CMD_OUTPUT_DELAY,
  hint: t9 + getCommandDuration(CMD_CONNECT) + CMD_OUTPUT_DELAY + 100,
  cursor: t9 + getCommandDuration(CMD_CONNECT) + CMD_OUTPUT_DELAY + 200,
};

const App = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const { position, isDragging, handleMouseDown, resetPosition } = useDraggable(isMaximized);

  // Auto-scroll terminal body when new content appears
  useEffect(() => {
    if (!terminalBodyRef.current || animationComplete) return;

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
  }, [animationComplete]);
  const { size, isResizing, handleResizeStart, resetSize } = useResizable();
  const terminalSize = useTerminalSize(terminalRef, isMaximized, size);

  const handleTerminalClick = () => {
    if (animationComplete && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim()) {
      setCommandHistory((prev) => [...prev, userInput]);
      setUserInput("");
    }
  };

  useKonami(() => setShowEasterEgg((v) => !v));

  const handleClose = () => {
    setIsHidden(true);
    setTimeout(() => setIsHidden(false), 2000);
  };

  const handleMinimize = () => {
    setIsMinimized((v) => !v);
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
    <div className="terminal-container crt-flicker">
      <MatrixRain />

      <div className="h-full w-full flex flex-col items-center justify-center relative z-10">
        {/* Terminal Window */}
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
          {/* Resize Handles */}
          {!isMaximized && (
            <>
              <div className="resize-handle resize-n" onMouseDown={(e) => handleResizeStart('n', e)} />
              <div className="resize-handle resize-s" onMouseDown={(e) => handleResizeStart('s', e)} />
              <div className="resize-handle resize-e" onMouseDown={(e) => handleResizeStart('e', e)} />
              <div className="resize-handle resize-w" onMouseDown={(e) => handleResizeStart('w', e)} />
              <div className="resize-handle resize-ne" onMouseDown={(e) => handleResizeStart('ne', e)} />
              <div className="resize-handle resize-nw" onMouseDown={(e) => handleResizeStart('nw', e)} />
              <div className="resize-handle resize-se" onMouseDown={(e) => handleResizeStart('se', e)} />
              <div className="resize-handle resize-sw" onMouseDown={(e) => handleResizeStart('sw', e)} />
            </>
          )}

          {/* Header Bar */}
          <div
            className={`terminal-header ${!isMaximized ? "terminal-draggable" : ""}`}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleHeaderDoubleClick}
          >
            <button
              type="button"
              className="terminal-btn terminal-btn-close"
              onClick={handleClose}
              aria-label="Close"
            />
            <button
              type="button"
              className="terminal-btn terminal-btn-minimize"
              onClick={handleMinimize}
              aria-label="Minimize"
            />
            <button
              type="button"
              className="terminal-btn terminal-btn-maximize"
              onClick={handleMaximize}
              aria-label="Maximize"
            />
            <div className="terminal-title">lior@dev:~ -- bash -- {terminalSize.cols}x{terminalSize.rows}</div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className={`terminal-body ${isMinimized ? "terminal-body-minimized" : ""}`}
            onClick={handleTerminalClick}
          >
            {/* Boot Sequence */}
            <div className="mb-6">
              <TerminalLine delay={TIMING.lastLogin}>
                <span className="text-[#666]">
                  Last login: {currentDate} {currentTime} on ttys001
                </span>
              </TerminalLine>

              <CommandLine command={CMD_NEOFETCH} delay={TIMING.neofetchCmd} typingDelay={TIMING.neofetchTypingDelay} typingSpeed={TYPING_SPEED} cursorUntil={TIMING.neofetchAscii} />

              <TerminalLine delay={TIMING.neofetchAscii}>
                <div className="mt-4">
                  <AsciiArt />
                </div>
              </TerminalLine>

              <TerminalLine delay={TIMING.neofetchMeta}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 mt-4 text-sm">
                  <div>
                    <span className="text-[#ffb000]">OS:</span>{" "}
                    <span className="text-[#888]">Human v2.0</span>
                  </div>
                  <div>
                    <span className="text-[#ffb000]">Role:</span>{" "}
                    <span className="text-[#888]">Software Engineer</span>
                  </div>
                  <div>
                    <span className="text-[#ffb000]">Shell:</span>{" "}
                    <span className="text-[#888]">zsh 5.9</span>
                  </div>
                  <div>
                    <span className="text-[#ffb000]">Specialty:</span>{" "}
                    <span className="text-[#888]">AI Agents Manager</span>
                  </div>
                  <div>
                    <span className="text-[#ffb000]">Uptime:</span>{" "}
                    <span className="text-[#888]">20+ years</span>
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

            {/* About Section */}
            <CommandLine command={CMD_CAT} delay={TIMING.catCmd} typingDelay={TIMING.catTypingDelay} typingSpeed={TYPING_SPEED} cursorUntil={TIMING.catOutput} />

            <TerminalLine delay={TIMING.catOutput}>
              <div className="command-output text-[#888] leading-relaxed">
                Building at the intersection of{" "}
                <span className="text-[#00ff41]">AI</span> and{" "}
                <span className="text-[#00ff41]">software engineering</span>.
                <br />
                I specialize in scalable systems - from microservices architecture to ML pipelines.
                <br />
                Open source contributor. Problem solver. Lifelong learner.
              </div>
            </TerminalLine>

            {/* Skills Section */}
            <CommandLine command={CMD_SKILLS} delay={TIMING.skillsCmd} typingDelay={TIMING.skillsTypingDelay} typingSpeed={TYPING_SPEED} cursorUntil={TIMING.skillsOutput} />

            <TerminalLine delay={TIMING.skillsOutput}>
              <div className="command-output flex flex-wrap gap-1 mt-2">
                {skills.map((skill) => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </div>
            </TerminalLine>

            {/* Projects Section */}
            <CommandLine command={CMD_PROJECTS} delay={TIMING.projectsCmd} typingDelay={TIMING.projectsTypingDelay} typingSpeed={TYPING_SPEED} cursorUntil={TIMING.projectsOutput} />

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

            {/* Connect Section */}
            <CommandLine command={CMD_CONNECT} delay={TIMING.connectCmd} typingDelay={TIMING.connectTypingDelay} typingSpeed={TYPING_SPEED} cursorUntil={TIMING.connectOutput} />

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

            {/* Hint */}
            <TerminalLine delay={TIMING.hint}>
              <div className="mt-6 text-[#333] text-xs">
                hint: try the konami code
              </div>
            </TerminalLine>

            {/* Easter Egg Content */}
            {showEasterEgg && (
              <TerminalLine>
                <div className="mt-4 p-4 border border-[#ff3333] bg-[#ff333310]">
                  <span className="text-[#ff3333]">
                    [ACHIEVEMENT UNLOCKED]
                  </span>
                  <br />
                  <span className="text-[#888]">
                    You found the secret! You're clearly someone who pays
                    attention to details.
                  </span>
                </div>
              </TerminalLine>
            )}

            {/* User command history */}
            {commandHistory.map((cmd, index) => (
              <div key={index} className="mb-1">
                <span className="prompt">
                  <span className="prompt-user">lior</span>
                  <span className="prompt-at">@</span>
                  <span className="prompt-host">dev</span>
                  <span className="prompt-at">:</span>
                  <span className="prompt-path">~</span>
                  <span className="prompt-symbol">$</span>
                </span>{" "}
                <span className="text-[#e4e4e7]">{cmd}</span>
              </div>
            ))}

            {/* Final command prompt with interactive input */}
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
                    <span className="text-[#e4e4e7]">{userInput}</span>
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

          {/* Terminal Footer */}
          <div className={`terminal-footer ${isMinimized ? "terminal-footer-minimized" : ""}`}>
            <span>PID: 1337</span>
            <span>CPU: 3.14%</span>
            <span>MEM: 42.0%</span>
            <span>
              {currentDate} {currentTime}
            </span>
          </div>
        </div>

        {/* Ad placeholder */}
        <ins
          className="adsbygoogle w-full max-w-sm mx-auto mt-8 block"
          style={{ display: "block" }}
          data-ad-client="ca-pub-4529248472834919"
          data-ad-slot="6061011972"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {/* Footer Credit */}
        <div className="text-center mt-8 text-[#333] text-xs">
          <span className="text-[#444]">{">"}</span> Crafted with{" "}
          <span className="text-[#ff3333]">{"<3"}</span> using React + TypeScript
        </div>
      </div>
    </div>
  );
};

export default App;
