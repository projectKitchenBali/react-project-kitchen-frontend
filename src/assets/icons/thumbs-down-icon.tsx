import chooseColor from "./chooseColor";

interface Types {
	type?: "primary" | "secondary" | "success" | "error";
	width?: number;
	height?: number;
	onClick?: () => void;
}

export default function ThumbsDownIcon({
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
				d="M17 2.00012H19.67C20.236 1.99011 20.7859 2.18825 21.2154 2.55694C21.645 2.92562 21.9242 3.43918 22 4.00012V11.0001C21.9242 11.5611 21.645 12.0746 21.2154 12.4433C20.7859 12.812 20.236 13.0101 19.67 13.0001H17M10 15.0001V19.0001C10 19.7958 10.3161 20.5588 10.8787 21.1214C11.4413 21.684 12.2044 22.0001 13 22.0001L17 13.0001V2.00012H5.72003C5.2377 1.99466 4.76965 2.16371 4.40212 2.47611C4.0346 2.78851 3.79235 3.22321 3.72003 3.70012L2.34003 12.7001C2.29652 12.9868 2.31586 13.2794 2.39669 13.5579C2.47753 13.8363 2.61793 14.0938 2.80817 14.3126C2.99842 14.5314 3.23395 14.7062 3.49846 14.8249C3.76297 14.9436 4.05012 15.0034 4.34003 15.0001H10Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
