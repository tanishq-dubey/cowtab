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
		chrome.storage.sync.get(legacyKeys, function(options) {
			for(const [previous, current] of Object.entries(legacyOptions)) {
				if(previous in options) {
					options[current] = options[previous];
					delete options.previous;
				}
			}
			chrome.storage.sync.remove(legacyKeys, ()=>{});
			chrome.storage.sync.set(options, ()=>{});
		}
	}

	// Save defaults options
	{
		const defaultOptions = {};
		const optionsInfo = await fetchJSON("options/options.json");
		for(const [option, data] of Object.entries(optionsInfo)) {
			defaultOptions[option] = data.default;
		}
		await chrome.storage.sync.get(defaultOptions, async function(options) {
			chrome.storage.sync.set(options, ()=>{});
		};
	}
});
