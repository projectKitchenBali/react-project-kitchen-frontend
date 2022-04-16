import chooseColor from "./chooseColor";

interface Types {
	type?: "primary" | "secondary" | "success" | "error" | "inherit";
	width?: number;
	height?: number;
	onClick?: () => void;
}

export default function AlertIcon({
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
			xmlns="http://www.w3.org/2000/svg"
			onClick={() => (onClick ? onClick() : null)}
		>
			<path
				d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 8V12"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 16H12.01"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
