# Cow Tab

### A simple new tab page that replicates the classic `fortune | cowsay` command.

It supports all kinds of quote lengths and types! Please make a PR if you see bugs, I'm not good at JS or web dev.

Get it here: https://chrome.google.com/webstore/detail/cow-tab/iecanhcmkngjdhpgnaijdcfnhpjdjffc?hl=en-US&gl=US

### To add a cow:
 1. Place your `.cow` file in the "cows" directory
 2. Add the filename to "cows/index.txt"
 3. (Optional) Add a translation to "\_locales/en/messages.json":

        ,
        "option_cowType_filenamecow": {
            "message": "Cow name"
        }

So if I wanted to add `abc-123.cow` I would copy the file to the "cows" directory, add its filename to "cows/index.txt" and add

	,
	"option_cowType_abc123cow": {
		"message": "ABC 123"
	}
at the end of the last translation in "\_locales/en/messages.json".

The cow will then be selectable in the options page.

### Thanks to:
alex-chew/landing (https://github.com/alex-chew/landing) for helping me with the options page

paulkaefer/cowsay-files (https://github.com/paulkaefer/cowsay-files) for providing additional cow files

https://packages.debian.org/sid/cowsay for providing me with the original cows

Huge thanks to metarmask (https://github.com/metarmask) for a giant refactor and cleanup.

![Very Short Fortunes](http://i.imgur.com/G1ceOgX.png)

![Very Long Fortunes](http://i.imgur.com/3yEe3Eg.png)

![And Short Fortunes](http://i.imgur.com/5cT3DBp.png)
