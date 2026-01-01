import { useEffect } from "react";

export const MatrixRain = () => {
	useEffect(() => {
		const chars = "01";
		const fontSize = 14;
		const columnCount = Math.floor(window.innerWidth / fontSize);
		const drops: number[] = Array(columnCount)
			.fill(0)
			.map(() => Math.random() * -100);

		const canvas = document.getElementById(
			"matrix-canvas",
		) as HTMLCanvasElement;
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
