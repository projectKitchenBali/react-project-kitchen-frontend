import chooseColor from "./chooseColor";

interface Types {
	type?: "primary" | "secondary" | "success" | "error" | "inherit";
	width?: number;
	height?: number;
	onClick?: () => void;
}

export default function UnfollowIcon({
	type = "primary",
	width = 24,
	height = 24,
	onClick,
}: Types) {
	const color = chooseColor(type);
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={() => (onClick ? onClick() : null)}
		>
			<path
				d="M5 12H19"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
