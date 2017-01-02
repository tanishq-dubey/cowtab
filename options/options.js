let defaultOptions = {};
let savedOptions;
let liveOptions;
const buttonReset = $("#button-reset");
const buttonSave = $("#button-save");
const saveStatus = $("#save-status");
const optionsElement = $("#options");

const updateSavability = () => {
	let same = true;
	for(const key of Object.keys(savedOptions)) {
		if(savedOptions[key] !== liveOptions[key]) {
			same = false;
			break;
		}
	}
	buttonSave.disabled = same;
}

const onOptionUpdate = (key, value) => {
	liveOptions[key] = value;
	updateSavability();
};

const save = async () => {
	buttonSave.disabled = true;
	savedOptions = JSON.parse(JSON.stringify(liveOptions));
	saveStatus.textContent = "Saving...";
	await chromep.storage.sync.set(savedOptions);
	buttonSave.disabled = false;
	saveStatus.textContent = "Saved.";
	updateSavability();
};

buttonSave.addEventListener("click", save);

buttonReset.addEventListener("click", async () => {
	buttonReset.disabled = true;
	liveOptions = JSON.parse(JSON.stringify(defaultOptions));
	await save();
	window.location.reload();
});

(async () => {
	const optionsInfo = await fetchJSON("options.json");
	for(const [key, value] of Object.entries(optionsInfo)) {
		defaultOptions[key] = value.default;
	}
	savedOptions = await chromep.storage.sync.get(defaultOptions);
	// Copy so modifications stay separate
	liveOptions = JSON.parse(JSON.stringify(savedOptions));
	for(const [key, value] of Object.entries(optionsInfo)) {
		const savedValue = savedOptions[key];
		const optionDiv = document.createElement("div");
		let input;
		optionDiv.classList.add("option");
		if(value.type === "color") {
			input = document.createElement("input");
			input.addEventListener("input", () => {
				onOptionUpdate(key, input.value);
			});
			input.type = "color";
			input.value = savedValue;
		} else if(value.type === "option") {
			input = document.createElement("select");
			input.addEventListener("change", () => {
				onOptionUpdate(key, input.value);
			});
			let options = [];
			if(value.options instanceof Array) {
				options = value.options;
			} else if(value.options.fromLines) {
				options = (await fetchText(value.options.fromLines))
				.split("\n")
				.filter(line => line.length !== 0);
			} else if(value.options.fromJSONKeys) {
				options = Object.keys(
					await fetchJSON(value.options.fromJSONKeys)
				);
			}
			options.forEach(option => {
				const element = document.createElement("option");
				const message = getMessage("option_" + key + "_" + option);
				element.value = option;
				element.textContent = message || option;
				if(option === savedValue) {
					debugger;
					element.selected = true;
				}
				input.appendChild(element);
			});
		}
		if(input) {
			input.id = "option-" + key.replace(/[A-Z]/g, match => {
				return "-" + match.toLowerCase();
			});
			const label = document.createElement("label");
			label.textContent = getMessage("option_" + key);
			label.htmlFor = input.id;
			optionDiv.appendChild(label);
			optionDiv.appendChild(input);
		}
		optionsElement.appendChild(optionDiv);
	}
})();
