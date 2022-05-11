const chooseColor = (type: string) => {
	switch (type) {
		case "primary":
			return "#f2f2f3ff";
		case "secondary":
			return "#8585adff";
		case "success":
			return "#00ccccff";
		case "error":
			return "#f20d33ff";
		case "inherit":
			return undefined;
	}
};

export default chooseColor;
