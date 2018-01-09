// Common functions used throughout the extension

const $ = (selector, from = document) => {
	return from.querySelector(selector);
};

const $$ = (selector, from = document) => {
	return Array.from(from.querySelectorAll(selector));
};

const fetchText = async (...args) => {
	return (await fetch(...args)).text();
};

const fetchJSON = async (...args) => {
	return (await fetch(...args)).json();
};

const i18nStrip = string => {
	return string.replace(/[^A-Za-z0-9_]/g, "");
};

const getMessage = (...args) => {
	args[0] = i18nStrip(args[0]);
	const message = chrome.i18n.getMessage(...args);
	if(!message) {
		console.warn("No message for ", args);
	}
	return message;
};

// Makes chrome.* APIs return promises
const chromePromiseTraps = {
	get: (target, property) => {
		const targetValue = target[property];
		if(typeof targetValue === "function") {
			return (...args) => new Promise((resolve, reject) => {
				targetValue(...args, argument => {
					if(chrome.runtime.lastError) {
						reject(chrome.runtime.lastError);
					} else {
						resolve(argument);
					}
				});
			});
		} else {
			return new Proxy(targetValue, chromePromiseTraps);
		}
	}
};
const chromep = new Proxy(chrome, chromePromiseTraps);
