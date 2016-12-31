function save_options() {
	var bgColor = document.getElementsByName("bgcolor")[0].value;
	var fgColor = document.getElementsByName("txcolor")[0].value;
	var cowType = document.getElementById("cowsel").value;
	var cowMods = document.getElementById("modForm").mod.value;
	chrome.storage.sync.set({
		bgColor: bgColor,
		fgColor: fgColor,
		cowType: cowType,
		cowMods: cowMods
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 3000);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		bgColor: "#22313F",
		fgColor: "#ECECEC",
		cowType: "default",
		cowMods: "default"
	}, function(items) {
		document.getElementsByName("bgcolor")[0].value = items.bgColor;
		document.getElementsByName("txcolor")[0].value = items.fgColor;
		document.getElementById("cowsel").value = items.cowType;
		document.getElementById(items.cowMods).checked = true;
	});
}

function reset_options() {
	var bgColor = document.getElementsByName("bgcolor")[0].value;
	var fgColor = document.getElementsByName("txcolor")[0].value;
	var cowType = document.getElementById("cowsel").value;
	chrome.storage.sync.set({
		bgColor: "#22313F",
		fgColor: "#ECECEC",
		cowType: "default",
		cowMods: "default"
	}, function() {
		// Update status to let user know options were saved.
		document.getElementsByName("bgcolor")[0].value = "#22313F";
		document.getElementsByName("txcolor")[0].value = "#ECECEC";
		cowType = document.getElementById("cowsel").value = "default";
		document.getElementById("default").checked = true;
		var status = document.getElementById('status');
		status.textContent = 'Options Reset.';
		setTimeout(function() {
			status.textContent = '';
		}, 3000);
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);
