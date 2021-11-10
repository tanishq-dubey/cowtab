chrome.runtime.onInstalled.addListener(async ({reason, previousVersion}) => {
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
		})
	}
});
