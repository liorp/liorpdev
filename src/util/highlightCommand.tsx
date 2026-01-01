import type { ReactNode } from "react";
import { KNOWN_COMMANDS } from "../const";

export const highlightCommand = (input: string): ReactNode => {
	if (!input) return null;
	const parts = input.split(/(\s+)/);
	const cmd = parts[0]?.toLowerCase();
	const isKnown = KNOWN_COMMANDS.includes(cmd);

	return (
		<>
			<span className={isKnown ? "text-[#00ff41]" : "text-[#e4e4e7]"}>
				{parts[0]}
			</span>
			<span className="text-[#e4e4e7]">{parts.slice(1).join("")}</span>
		</>
	);
};
