export type Project = {
	name: string;
	description: string;
	url: string;
};

export const projects: Project[] = [
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

export const skills = [
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

export type SocialLink = {
	name: string;
	url: string;
	icon: string;
};

export const socialLinks: SocialLink[] = [
	{ name: "GitHub", url: "https://github.com/liorpdev", icon: "gh" },
	{ name: "LinkedIn", url: "https://linkedin.com/in/liorpolak", icon: "in" },
	{ name: "Twitter", url: "https://twitter.com/liorpdev", icon: "tw" },
];
