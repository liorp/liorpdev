export const TYPING_SPEED = 30;
export const OUTPUT_DELAY = 100;
export const SECTION_DELAY = 800;
export const CMD_OUTPUT_DELAY = 1500;

export const getCommandDuration = (cmd: string) =>
	cmd.length * TYPING_SPEED + OUTPUT_DELAY;

export const CMD_NEOFETCH = "neofetch --ascii";
export const CMD_CAT = "cat about.txt";
export const CMD_SKILLS = "ls -la ./skills/";
export const CMD_PROJECTS = "ls -la ./projects/";
export const CMD_CONNECT = "ls -la ./connect/";

const t1 = 100;
const t2 = t1 + getCommandDuration(CMD_NEOFETCH) + CMD_OUTPUT_DELAY;
const t3 = t2 + SECTION_DELAY;
const t4 = t3 + getCommandDuration(CMD_CAT) + CMD_OUTPUT_DELAY;
const t5 = t4 + SECTION_DELAY;
const t6 = t5 + getCommandDuration(CMD_SKILLS) + CMD_OUTPUT_DELAY;
const t7 = t6 + SECTION_DELAY;
const t8 = t7 + getCommandDuration(CMD_PROJECTS) + CMD_OUTPUT_DELAY;
const t9 = t8 + SECTION_DELAY;

export const TIMING = {
	lastLogin: 0,
	neofetchCmd: t1,
	neofetchTypingDelay: 0,
	neofetchAscii: t2,
	neofetchMeta: t2 + 400,
	catCmd: t2 + 400,
	catTypingDelay: SECTION_DELAY,
	catOutput: t4,
	skillsCmd: t4,
	skillsTypingDelay: SECTION_DELAY,
	skillsOutput: t6,
	projectsCmd: t6,
	projectsTypingDelay: SECTION_DELAY,
	projectsOutput: t8,
	connectCmd: t8,
	connectTypingDelay: SECTION_DELAY,
	connectOutput: t9 + getCommandDuration(CMD_CONNECT) + CMD_OUTPUT_DELAY,
	hint: t9 + getCommandDuration(CMD_CONNECT) + CMD_OUTPUT_DELAY + 100,
	cursor: t9 + getCommandDuration(CMD_CONNECT) + CMD_OUTPUT_DELAY + 200,
};
