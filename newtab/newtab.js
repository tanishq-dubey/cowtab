const tabSize = 8;

const getRandomInArray = array => {
	return array[Math.floor(Math.random() * array.length)];
}

function weighted_random(items, weights) {
    var i;

    for (i = 0; i < weights.length; i++)
        weights[i] += weights[i - 1] || 0;
    
    var random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    
    return items[i];
}

const getRandomInFolder = async folder => {
	let files = (await fetchText(folder + "/index.txt")).split("\n");
	/* Remove empty string at end of array because of UNIX line ending */
	files = files.slice(0, -1);
  let fnames = [];
  let weights = [];
  for (let i = 0; i < files.length; i++) {
    const data = files[i].split(",");
    if (data[1] !== "0") {
      fnames.push(data[0]);
      weights.push(data[1]);
    }
  }

  let retfname = weighted_random(fnames, weights);

	return fetchText(folder + "/" + retfname);
};


// Display cow
async function renderCow(options) {
	const cowModifiers = await fetchJSON("../cow-modifiers.json");
	const styleElement = document.createElement("style");
  
  if (!options.hasOwnProperty("backgroundColor")) {
    options.backgroundColor = "#22313F";
  }
  if (!options.hasOwnProperty("textColor")) {
    options.textColor = "#ECECEC";
  }
  if (!options.hasOwnProperty("cowType")) {
    options.cowType = "default.cow";
  }
  if (!options.hasOwnProperty("cowModifier")) {
    options.cowModifier = "default";
  }

	styleElement.textContent = `
		html {
			background-color: ${options.backgroundColor};
			color: ${options.textColor};
		}
	`;
	document.head.appendChild(styleElement);

	let cow = await fetchText("../cows/" + options.cowType);

	// Remove non-cow lines
	cow = cow.match(/\$the_cow =.+\n([\S\s]*?)EOC/)[1];

	// "Unescape" backslashes
	cow = cow.replace(/\\\\/g, "\\");

	// Apply modifiers
	Object.entries(
		Object.assign(
			{},
			cowModifiers.default,
			cowModifiers[options.cowModifier]
		)
	).forEach(([key, value]) => {
		cow = cow.split("$" + key).join(value);
	});

	$("#cow").textContent = cow;
};

// Display fortune
const renderFortune = async () => {
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
};

async function renderPage(options) {
    await renderCow(options)
    await renderFortune()
}

(async () => {
	await chrome.storage.sync.get(
		Object.keys(await fetchJSON("../options/options.json")), renderPage
	);
})();
