const speechElement = document.querySelector("#speech");
const tabSize = 8;
const getRandomIn = array => {
	return array[Math.floor(Math.random() * array.length)];
}

(async () => {
	const fortuneFiles = (await (await fetch("fortunes/index.txt")).text()).split("\n").slice(0, -1);
	const fortuneFileContent = await (await fetch("fortunes/" + getRandomIn(fortuneFiles))).text();
	const fortunes = fortuneFileContent.split("\n%\n")
	.filter(fortune => fortune.length !== 0);

	let fortuneLines = getRandomIn(fortunes).split("\n");

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

	speechElement.textContent = fortuneLines.join("\n");
})();
