import chooseColor from "./chooseColor";

interface Types {
	type?: "primary" | "secondary" | "success" | "error" | "inherit";
	width?: number;
	height?: number;
	onClick?: () => void;
}

export default function ChevronsRightIcon({
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
				d="M13 17L18 12L13 7"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M6 17L11 12L6 7"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
