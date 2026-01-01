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

const TIMING = {
  lastLogin: 0,
  neofetchCmd: 100,
  neofetchOutput: 100 + getCommandDuration(CMD_NEOFETCH),
  catCmd: 100 + getCommandDuration(CMD_NEOFETCH) + 100,
  catOutput: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT),
  skillsHeader: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT) + 100,
  skillsCmd: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT) + 100,
  skillsOutput: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT) + 100 + getCommandDuration(CMD_SKILLS),
  projectsHeader: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT) + 100 + getCommandDuration(CMD_SKILLS) + 100,
  projectsCmd: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT) + 100 + getCommandDuration(CMD_SKILLS) + 100,
  projectsOutput: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT) + 100 + getCommandDuration(CMD_SKILLS) + 100 + getCommandDuration(CMD_PROJECTS),
  connectHeader: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT) + 100 + getCommandDuration(CMD_SKILLS) + 100 + getCommandDuration(CMD_PROJECTS) + 350,
  connectOutput: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT) + 100 + getCommandDuration(CMD_SKILLS) + 100 + getCommandDuration(CMD_PROJECTS) + 400,
  hint: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT) + 100 + getCommandDuration(CMD_SKILLS) + 100 + getCommandDuration(CMD_PROJECTS) + 500,
  cursor: 100 + getCommandDuration(CMD_NEOFETCH) + 100 + getCommandDuration(CMD_CAT) + 100 + getCommandDuration(CMD_SKILLS) + 100 + getCommandDuration(CMD_PROJECTS) + 600,
};

const App = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const { position, isDragging, handleMouseDown, resetPosition } = useDraggable(isMaximized);

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
    }
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

      <div className="max-w-4xl mx-auto p-4 md:p-8 relative z-10">
        {/* Terminal Window */}
        <div
          className={`terminal-window ${isMaximized ? "terminal-maximized" : ""} ${isHidden ? "terminal-hidden" : ""}`}
          style={
            !isMaximized
              ? {
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  transition: isDragging ? "none" : "transform 0.1s ease-out",
                }
              : undefined
          }
        >
          {/* Header Bar */}
          <div
            className={`terminal-header ${!isMaximized ? "terminal-draggable" : ""}`}
            onMouseDown={handleMouseDown}
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
            <div className="terminal-title">lior@dev:~ -- bash -- 80x24</div>
          </div>

          {/* Terminal Body */}
          <div className={`terminal-body ${isMinimized ? "terminal-body-minimized" : ""}`}>
            {/* Boot Sequence */}
            <div className="mb-6">
              <TerminalLine delay={TIMING.lastLogin}>
                <span className="text-[#666]">
                  Last login: {currentDate} {currentTime} on ttys001
                </span>
              </TerminalLine>

              <CommandLine command={CMD_NEOFETCH} delay={TIMING.neofetchCmd} typingSpeed={TYPING_SPEED} />

              <TerminalLine delay={TIMING.neofetchOutput}>
                <div className="mt-4">
                  <AsciiArt />
                </div>
              </TerminalLine>

              <TerminalLine delay={TIMING.neofetchOutput}>
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
            <CommandLine command={CMD_CAT} delay={TIMING.catCmd} typingSpeed={TYPING_SPEED} />

            <TerminalLine delay={TIMING.catOutput}>
              <div className="command-output text-[#888] leading-relaxed max-w-2xl">
                Building at the intersection of{" "}
                <span className="text-[#00ff41]">AI</span> and{" "}
                <span className="text-[#00ff41]">software engineering</span>.
                <br />
                I specialize in scalable systems - from microservices
                architecture to ML pipelines.
                <br />
                Open source contributor. Problem solver. Lifelong learner.
              </div>
            </TerminalLine>

            {/* Skills Section */}
            <SectionHeader delay={TIMING.skillsHeader}>Skills</SectionHeader>

            <CommandLine command={CMD_SKILLS} delay={TIMING.skillsCmd} typingSpeed={TYPING_SPEED} />

            <TerminalLine delay={TIMING.skillsOutput}>
              <div className="command-output flex flex-wrap gap-1 mt-2">
                {skills.map((skill) => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </div>
            </TerminalLine>

            {/* Projects Section */}
            <SectionHeader delay={TIMING.projectsHeader}>Projects</SectionHeader>

            <CommandLine command={CMD_PROJECTS} delay={TIMING.projectsCmd} typingSpeed={TYPING_SPEED} />

            <div className="command-output">
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
            <SectionHeader delay={TIMING.connectHeader}>Connect</SectionHeader>

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

            {/* Final command prompt with blinking cursor */}
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
                {animationComplete && <span className="cursor" />}
              </div>
            </TerminalLine>
          </div>

          {/* Terminal Footer */}
          <div className={`terminal-footer ${isMinimized ? "terminal-footer-minimized" : ""}`}>
            <span>PID: 1337</span>
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
