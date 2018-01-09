chrome.runtime.onInstalled.addListener(async ({reason, previousVersion}) => {
	if(
		   reason === "update"
		&& previousVersion !== chrome.runtime.getManifest().version
	) {
		chrome.windows.create({url: "changes/changes.html", type: "popup"});
	}

	// Convert legacy option keys
	{
		const legacyOptions = {
			bgColor: "backgroundColor",
			fgColor: "textColor",
			cowMods: "cowModifier"
		};
		const legacyKeys = Object.keys(legacyOptions);
		const options = await chromep.storage.sync.get(legacyKeys);
		for(const [previous, current] of Object.entries(legacyOptions)) {
			if(previous in options) {
				options[current] = options[previous];
				delete options.previous;
			}
		}
		await chromep.storage.sync.remove(legacyKeys);
		await chromep.storage.sync.set(options);
	}

	// Save defaults options
	{
		const defaultOptions = {};
		const optionsInfo = await fetchJSON("options/options.json");
		for(const [option, data] of Object.entries(optionsInfo)) {
			defaultOptions[option] = data.default;
		}
		chromep.storage.sync.set(
			await chromep.storage.sync.get(defaultOptions)
		);
	}
});
