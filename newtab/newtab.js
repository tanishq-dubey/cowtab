const tabSize = 8;
const getRandomInArray = array => {
	return array[Math.floor(Math.random() * array.length)];
}

const getRandomInFolder = async folder => {
	let files = (await fetchText(folder + "/index.txt")).split("\n");
	/* Remove empty string at end of array because of UNIX line ending */
	files = files.slice(0, -1);
	return (await fetch(folder + "/" + getRandomInArray(files))).text();
};

const getOptions = () => {
	return new Promise(resolve => {
		chrome.storage.sync.get({
			bgColor: "#22313F",
			fgColor: "#ECECEC",
			cowType: "default",
			cowMods: "default"
		}, resolve);
	});
};

const cowModifiers = {
	default: {
		thoughts: "\\",
		eyes: "oo",
		tongue: "  "
	},
	borg: {
		eyes: "=="
	},
	dead: {
		eyes: "XX",
		tongue: "U "
	},
	greedy: {
		eyes: "$$"
	},
	paranoid: {
		eyes: "@@"
	},
	stoned: {
		eyes: "**",
		tongue: "U "
	},
	tired: {
		eyes: "--"
	},
	wired: {
		eyes: "OO"
	},
	youthful: {
		eyes: ".."
	}
};

// Display cow
(async () => {
	const options = await getOptions();
	const styleElement = document.createElement("style");
	styleElement.textContent = `
		body {
			background-color: ${options.bgColor};
			color: ${options.fgColor};
		}
	`;
	document.head.appendChild(styleElement);

	let cow = await (await fetch("../cows/" + options.cowType + ".cow")).text();

	// Remove non-cow lines
	cow = cow
	.split("\n")
	.filter(line => !line.startsWith("#"))
	.slice(1, -2)
	.join("\n");

	// "Unescape" backslashes
	cow = cow.replace(/\\\\/g, "\\");

	// Apply modifiers
	Object.entries(
		Object.assign(
			{},
			cowModifiers.default,
			cowModifiers[options.cowMods]
		)
	).forEach(([key, value]) => {
		cow = cow.split("$" + key).join(value);
	});

	$("#cow").textContent = cow;
})();

// Display fortune
(async () => {
	const fortunes = (await getRandomInFolder("../fortunes")).split("\n%\n")
	.filter(fortune => fortune.length !== 0);

	let fortuneLines = getRandomInArray(fortunes).split("\n");

	// Replace tabs with spaces so length checks work
	fortuneLines = fortuneLines.map(line => {
		return line.replace(/\t/g, " ".repeat(tabSize));
	});

	const maxWidth = fortuneLines.reduce((max, {length}) => {
		if(length > max) {
			return length;
		} else {
			return max;
		}
	}, 0);

	// Side bars
	fortuneLines = fortuneLines.map((line, index, {length}) => {
		const endPadding = " ".repeat(maxWidth - line.length);
		// Handle fortune being single line differently
		if(length === 1) {
			return "< "  + line + endPadding + " >";
		} else if(index === 0) {
			return "/ "  + line + endPadding + " \\";
		} else if(index === length - 1) {
			return "\\ " + line + endPadding + " /";
		} else {
			return "| "  + line + endPadding + " |";
		}
	});

	// Top and bottom bars, padded with space on the 2 sides
	fortuneLines.unshift(" " + "_".repeat(maxWidth + 2));
	fortuneLines.push(   " " + "-".repeat(maxWidth + 2));

	$("#speech").textContent = fortuneLines.join("\n");
})();
