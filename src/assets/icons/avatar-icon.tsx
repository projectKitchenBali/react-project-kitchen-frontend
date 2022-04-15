interface Types {
	width?: number;
	height?: number;
	onClick?: () => void;
}

export default function AvatarIcon({
	width = 24,
	height = 24,
	onClick,
}: Types) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 120 120"
			fill="none"
			stroke="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={() => (onClick ? onClick() : null)}
		>
			<circle
				cx="60"
				cy="60"
				r="59"
				fill="#4C4CFF"
				stroke="#1C1C21"
				strokeWidth="2"
			/>
			<path
				stroke="none"
				d="M24 50.505C24 72.1136 43.1163 102 60.0001 102C75.8945 102 96 72.1136 96 50.505C96 28.8964 79.8823 18 59.9999 18C40.1176 18 24 28.8964 24 50.505ZM69.3535 66.4835C73.7491 62.4379 79.8818 60.9665 85.5419 62.0676C86.7381 67.277 85.1396 72.9213 80.744 76.9669C76.3483 81.0125 70.2157 82.4839 64.5556 81.3828C63.3592 76.1733 64.9579 70.529 69.3535 66.4835ZM34.4579 62.0675C40.118 60.9665 46.2507 62.4378 50.6463 66.4834C55.0419 70.529 56.6406 76.1733 55.4443 81.3827C49.7842 82.4836 43.6515 81.0124 39.2559 76.9668C34.8603 72.921 33.2617 67.2768 34.4579 62.0675Z"
				fill="#1C1C21"
			/>
		</svg>
	);
}
