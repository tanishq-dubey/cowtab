#Cow Tab
###A simple new tab page that replicates the classic `fortune | cowsay` command.

It supports all kinds of quote lengths and types! Please make a PR if you see bugs, I'm not good at JS or web dev.

Get it here: https://chrome.google.com/webstore/detail/cow-tab/iecanhcmkngjdhpgnaijdcfnhpjdjffc?hl=en-US&gl=US

### To add a cow:
 1. Place your `.cow` file in the "cows" directory
 2. Add your cow to the `options.html` (line 21)
 3. Select your cow in the options page
 
So if i wanted to add `test.cow` I would copy the file to the "cows" directory, add `<option value="test">test</option>` to the `options.html` at line 21, and then select the cow in the options.

### Thanks to:
alex-chew/landing (https://github.com/alex-chew/landing) for helping me with the options page
paulkaefer/cowsay-files (https://github.com/paulkaefer/cowsay-files) for providing additional cow files
https://packages.debian.org/sid/cowsay for providing me with the original cows

![Very Short Fortunes](http://i.imgur.com/G1ceOgX.png)

![Very Long Fortunes](http://i.imgur.com/3yEe3Eg.png)

![And Short Fortunes](http://i.imgur.com/5cT3DBp.png)
