import vscode from "vscode";

type TMappingsKey = "${number}:${number}";

type TMappingsValue = {
	color?: string;
	fileIcon?: string;
};

type TMappings = Record<TMappingsKey, TMappingsValue>;

export const applyThemes = () => {
	const config = vscode.workspace.getConfiguration("timeBasedSwitcher");
	const mappings = config.get<TMappings>("mappings");

	if (!mappings) {
		console.error("No mappings found in configuration");
		return;
	}

	// Sort the times ascending
	const sortedKeys = Object.keys(mappings).sort((a, b) => {
		const parsedA = parseTime(a);
		const parsedB = parseTime(b);

		return (
			parsedA.getHours() - parsedB.getHours() ||
			parsedA.getMinutes() - parsedB.getMinutes()
		);
	}) as TMappingsKey[];

	const date = new Date();
	const now = parseTime(`${date.getHours()}:${date.getMinutes()}`);
	let selectedKey = sortedKeys.reverse().find((key) => {
		return now.getTime() >= parseTime(key).getTime();
	});

	if (!selectedKey) {
		//
		/**
		 * If a key isn't found, we're between the last and first key. In that case, we want to use the last key.
		 *
		 * i.e. if the keys are:
		 * 1. 08:00
		 * 2. 18:00
		 *
		 * And the current time is 02:00, we want to use 18:00.
		 */
		selectedKey = sortedKeys[sortedKeys.length - 1];
	}

	console.log(`applying themes for ${selectedKey}`);
	const selectedValue = mappings[selectedKey];

	if (selectedValue.color) {
		vscode.workspace
			.getConfiguration()
			.update("workbench.colorTheme", selectedValue.color);
		console.log(`applying color theme ${selectedValue.color}`);
	}

	if (selectedValue.fileIcon) {
		vscode.workspace
			.getConfiguration()
			.update("workbench.iconTheme", selectedValue.fileIcon);
		console.log(`applying file icon theme ${selectedValue.fileIcon}`);
	}
};

const parseTime = (time: string) => {
	const [hour, minute] = time.split(":").map(Number);
	const date = new Date();
	date.setUTCHours(hour, minute, 0, 0);
	return date;
};
