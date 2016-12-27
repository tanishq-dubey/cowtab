'use strict';
/* globals chrome */


const save_options = () => {
    let vegan = document.getElementById('vegan').checked;
    chrome.storage.sync.set({
        vegan: vegan
    }, () => {
        window.alert('status saved');
        console.log('asdlkhgas');
    });
};

const restore_options = () => {
    chrome.storage.sync.get({
        vegan: false
    }, (items) => {
        console.log('vegan?');
        console.log(items.vegan);
        document.getElementById('vegan').checked = items.vegan;
    });
};

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('submit').addEventListener('click', () => {
    save_options();
});
