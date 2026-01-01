import type { ReactNode } from "react";
import { LIOR_ASCII } from "../const";

export const getCommandOutput = (cmd: string): ReactNode => {
	const trimmed = cmd.trim().toLowerCase();
	const parts = trimmed.split(/\s+/);
	const baseCmd = parts[0];

	if (trimmed === "help") {
		return (
			<div className="text-[#888]">
				Available commands:
				<br /> <span className="text-[#00ff41]">help</span> - Show this help
				message
				<br /> <span className="text-[#00ff41]">clear</span> - Clear terminal
				history
				<br /> <span className="text-[#00ff41]">whoami</span> - Display current
				user
				<br /> <span className="text-[#00ff41]">pwd</span> - Print working
				directory
				<br /> <span className="text-[#00ff41]">ls</span> - List directory
				contents
				<br /> <span className="text-[#00ff41]">cat</span> [file] - Display file
				contents
				<br /> <span className="text-[#00ff41]">echo</span> [text] - Print text
				<br /> <span className="text-[#00ff41]">date</span> - Show current
				date/time
				<br /> <span className="text-[#00ff41]">uname</span> - System
				information
				<br /> <span className="text-[#00ff41]">history</span> - Show command
				history
				<br /> <span className="text-[#00ff41]">neofetch</span> - Display system
				info
				<br /> <span className="text-[#00ff41]">about</span> - About me
				<br /> <span className="text-[#00ff41]">skills</span> - List my skills
				<br /> <span className="text-[#00ff41]">projects</span> - List my
				projects
				<br /> <span className="text-[#00ff41]">contact</span> /{" "}
				<span className="text-[#00ff41]">connect</span> - Contact links
			</div>
		);
	}

	if (trimmed === "clear") {
		return "__CLEAR__";
	}

	if (trimmed === "whoami") {
		return <span className="text-[#00ff41]">lior</span>;
	}

	if (trimmed === "pwd") {
		return <span className="text-[#888]">/home/lior</span>;
	}

	if (trimmed === "neofetch" || trimmed === "neofetch --ascii") {
		return (
			<div>
				<pre className="ascii-art text-center my-4 terminal-glow">
					{LIOR_ASCII}
				</pre>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 mt-2 text-sm">
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
						<span className="text-[#00ff41]">● Online</span>
					</div>
				</div>
			</div>
		);
	}

	if (
		trimmed === "ls" ||
		trimmed === "ls -la" ||
		trimmed === "ls -l" ||
		trimmed === "ls -a"
	) {
		return (
			<div className="text-[#888]">
				<span className="text-[#00ffff]">-rw-r--r--</span> about.txt
				<br />
				<span className="text-[#00ffff]">drwxr-xr-x</span> skills/
				<br />
				<span className="text-[#00ffff]">drwxr-xr-x</span> projects/
				<br />
				<span className="text-[#00ffff]">drwxr-xr-x</span> connect/
			</div>
		);
	}

	if (
		trimmed === "skills" ||
		trimmed === "ls skills" ||
		trimmed === "ls skills/" ||
		trimmed === "ls ./skills/" ||
		trimmed === "ls -la ./skills/" ||
		trimmed === "ls -la skills/"
	) {
		return (
			<div className="flex flex-wrap gap-1 mt-1">
				{[
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
				].map((skill) => (
					<span key={skill} className="skill-tag">
						{skill}
					</span>
				))}
			</div>
		);
	}

	if (
		trimmed === "projects" ||
		trimmed === "ls projects" ||
		trimmed === "ls projects/" ||
		trimmed === "ls ./projects/" ||
		trimmed === "ls -la ./projects/" ||
		trimmed === "ls -la projects/"
	) {
		return (
			<div className="text-[#888] mt-1">
				<div>
					<span className="text-[#00ff41]">blog</span> - Tech & AI thoughts -
					deep dives into software engineering
				</div>
				<div>
					<span className="text-[#00ff41]">milan</span> - Hebrew word game -
					daily puzzle challenge
				</div>
				<div>
					<span className="text-[#00ff41]">hzi</span> - Smart electricity
					calculator - optimize your energy usage
				</div>
				<div>
					<span className="text-[#00ff41]">fireplace</span> - Retirement
					location finder - discover your ideal destination
				</div>
				<div>
					<span className="text-[#00ff41]">cmprsr</span> - Learn compression
					algorithms - interactive visualizations
				</div>
			</div>
		);
	}

	if (
		trimmed === "contact" ||
		trimmed === "connect" ||
		trimmed === "ls connect" ||
		trimmed === "ls connect/" ||
		trimmed === "ls ./connect/" ||
		trimmed === "ls -la ./connect/" ||
		trimmed === "ls -la connect/"
	) {
		return (
			<div className="flex gap-6 mt-1 connect-links">
				<a
					href="https://github.com/liorpdev"
					target="_blank"
					rel="noreferrer"
					className="text-[#00ffff] hover:text-[#00ff41]"
				>
					[gh] GitHub
				</a>
				<a
					href="https://linkedin.com/in/liorpolak"
					target="_blank"
					rel="noreferrer"
					className="text-[#00ffff] hover:text-[#00ff41]"
				>
					[in] LinkedIn
				</a>
				<a
					href="https://twitter.com/liorpdev"
					target="_blank"
					rel="noreferrer"
					className="text-[#00ffff] hover:text-[#00ff41]"
				>
					[tw] Twitter
				</a>
			</div>
		);
	}

	if (trimmed === "about" || trimmed === "cat about.txt") {
		return (
			<div className="text-[#888]">
				Building at the intersection of{" "}
				<span className="text-[#00ff41]">AI</span> and{" "}
				<span className="text-[#00ff41]">software engineering</span>.
				<br />I specialize in scalable systems - from microservices architecture
				to ML pipelines.
				<br />
				Open source contributor. Problem solver. Lifelong learner.
			</div>
		);
	}

	if (baseCmd === "cat") {
		const file = parts[1];
		if (!file) {
			return <span className="text-[#ff3333]">cat: missing file operand</span>;
		}
		return (
			<span className="text-[#ff3333]">
				cat: {file}: No such file or directory
			</span>
		);
	}

	if (baseCmd === "echo") {
		const text = cmd.trim().slice(5);
		return <span className="text-[#888]">{text || ""}</span>;
	}

	if (trimmed === "date") {
		return <span className="text-[#888]">{new Date().toString()}</span>;
	}

	if (trimmed === "uname" || trimmed === "uname -a") {
		return (
			<span className="text-[#888]">
				Human v2.0 lior-dev 20+ years experience
			</span>
		);
	}

	if (trimmed === "history") {
		return "__HISTORY__";
	}

	if (trimmed === "") {
		return null;
	}

	return (
		<span className="text-[#ff3333]">zsh: command not found: {baseCmd}</span>
	);
};
