export type AppCardProps = {
	link?: string;
	favicon: string;
	title: string;
	subtitle: string;
	onClick?: () => void;
};

export const AppCard = ({
	link,
	favicon,
	title,
	subtitle,
	onClick,
}: AppCardProps) => {
	return (
		<div className="app-card">
			<a
				className="app-card__link"
				href={link}
				target="_blank"
				rel="noreferrer"
				onClick={onClick}
			>
				<img src={favicon} className="app-card__icon" alt={title} />
				<div className="app-card__body">
					<h2 className="app-card__title">{title}</h2>
					<p className="app-card__subtitle">{subtitle}</p>
				</div>
			</a>
		</div>
	);
};
