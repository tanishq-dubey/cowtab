chrome.runtime.onInstalled.addListener(details => {
	if(details.reason === "update") {
		let newVersion = chrome.runtime.getManifest().version;
		console.log(`Updated from ${details.previousVersion} to ${newVersion}`);
		if(details.previousVersion != newVersion) {
			chrome.windows.create({url: "changes.html", type: "popup"});
		}
	}
});
