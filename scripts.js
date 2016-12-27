document.addEventListener("DOMContentLoaded", function() {
    var lines;
    var randomN;

    var files = ["art", "ascii-art", "computers", "cookie", "definitions", "drugs", "education", "ethnic", "food", "fortunes", "goedel", "humorists", "kids", "law", "linuxcookie", "literature", "love", "magic", "medicine", "men-women", "miscellaneous", "news", "people", "pets", "platitudes", "politics", "riddles", "science", "songs-poems", "sports", "startrek", "translate-me", "wisdom", "work", "zippy"];
    var randF = parseInt(Math.random() * files.length);



    $.ajax({
        url: 'fortunes/' + files[randF]
    }).done(function(content){
        var cowF = "default";
        var cowM = "default";
        var cowfiles = ["C3PO.cow", "R2-D2.cow", "USA.cow", "ackbar.cow", "aperture-blank.cow", "aperture.cow", "atat.cow", "atom.cow", "awesome-face.cow", "banana.cow", "beavis.zen.cow", "bees.cow", "bill-the-cat.cow", "biohazard.cow", "bishop.cow", "black-mesa.cow", "bong.cow", "box.cow", "broken-heart.cow", "bud-frogs.cow", "bunny.cow", "cake-with-candles.cow", "cake.cow", "cat.cow", "cheese.cow", "chessmen.cow", "claw-arm.cow", "clippy.cow", "companion-cube.cow", "cower.cow", "cube.cow", "daemon.cow", "dalek-shooting.cow", "dalek.cow", "default.cow", "dolphin.cow", "dragon-and-cow.cow", "dragon.cow", "elephant-in-snake.cow", "elephant.cow", "elephant2.cow", "explosion.cow", "eyes.cow", "fat-banana.cow", "fat-cow.cow", "fire.cow", "flaming-sheep.cow", "fox.cow", "ghostbusters.cow", "glados.cow", "golden-eagle.cow", "happy-whale.cow", "head-in.cow", "hellokitty.cow", "homer.cow", "jellyfish.cow", "kilroy.cow", "king.cow", "kiss.cow", "kitten.cow", "kitty.cow", "knight.cow", "koala.cow", "kosh.cow", "lightbulb.cow", "lobster.cow", "lollerskates.cow", "luke-koala.cow", "mailchimp.cow", "maze-runner.cow", "mech-and-cow", "meow.cow", "milk.cow", "mona-lisa.cow", "moofasa.cow", "moose.cow", "mule.cow", "mutilated.cow", "nyan.cow", "octopus.cow", "pawn.cow", "periodic-table.cow", "personality-sphere.cow", "pinball-machine.cow", "pterodactyl.cow", "queen.cow", "radio.cow", "ren.cow", "robot.cow", "robotfindskitten.cow", "roflcopter.cow", "rook.cow", "seahorse-big.cow", "seahorse.cow", "sheep.cow", "skeleton.cow", "smiling-octopus.cow", "stegosaurus.cow", "stimpy.cow", "sudowoodo.cow", "taxi.cow", "template.cow", "three-eyes.cow", "threecubes.cow", "toaster.cow", "tortoise.cow", "turkey.cow", "turtle.cow", "tux-big.cow", "tux.cow", "tweety-bird.cow", "vader-koala.cow", "vader.cow", "weeping-angel.cow", "whale.cow", "world.cow", "www.cow"];
        chrome.storage.sync.get({
            bgColor: "#22313F",
            fgColor: "#ECECEC",
            cowType: "default",
            cowMods: "default"
        }, function(items) {
            document.getElementById("main").style.backgroundColor = items.bgColor;
            document.getElementById("main").style.color = items.fgColor;
            cowF = items.cowType;
            cowM = items.cowMods;
            console.log(cowM);
            console.log(items.cowMods);
            var cowFile = new XMLHttpRequest();
            // Now load the cow file
            cowFile.open("GET", "cows/" + cowF + ".cow", true);
            cowFile.onload = function () {
                if(cowFile.readyState === 4) {
                    if (cowFile.status === 200 || cowFile.status === 0) {
                        var cowText = cowFile.responseText;

                        // Got the file, now parse it
                        var thoughtText = "\\";
                        var eyeText = "oo";
                        var tongueText = "  ";
                        console.log(cowM);
                        // Check to see if any modifiers have been applied
                        if (cowM === "borg") {
                            eyeText = "==";
                        } else if(cowM === "dead") {
                            eyeText = "XX";
                            tongueText = "U ";
                        } else if(cowM === "greedy") {
                            eyeText = "$$";
                        } else if(cowM === "paranoid") {
                            eyeText = "@@";
                        } else if(cowM === "stoned") {
                            eyeText = "**";
                            tongueText = "U ";
                        } else if(cowM === "tired") {
                            eyeText = "--";
                        } else if(cowM === "wired") {
                            eyeText = "OO";
                        } else if(cowM === "youthful") {
                            eyeText = "..";
                        }

                        //Remove comment lines
                        cowText = cowText.replace(/^[#].*\n/gm, "");

                        // Put in thoughts, eyes, and tongue (if needed)
                        cowText = cowText.replace(/\$thoughts/g, thoughtText);
                        cowText = cowText.replace(/\$eyes/g, eyeText);
                        cowText = cowText.replace(/\$tongue/g, tongueText);

                        // Clean up top and bottom
                        cowText = cowText.replace(/\nEOC/g, "");
                        cowText = cowText.split("\n").slice(1).join("\n");

                        // Set it!
                        cowsaycow.innerHTML = cowText;
                    }
                }
            }
            // Apperently this makes it async? (IDK how JS works)
            cowFile.send(null);
        });
        lines = content.split(/\n%\n/);
        if(lines && lines.length) {
            do {
                randomN = parseInt(Math.random() * lines.length);
                var cowsaycow = document.getElementById("cow");
                var cowsayOutput = document.getElementById("cowsay-output");
                var cowsayTop = document.getElementById("cowsay-barsTop");
                var cowsayBot = document.getElementById("cowsay-barsBot");
                var inputText = lines[randomN];
                var barsTop = "";
                var barsBot = "";
                var textArray = inputText.split('\n');
                var maxWidth = 0;
                var numLines = 0;

                for(var i = 0; i < textArray.length; ++i) {
                    textArray[i].replace('  ', ' ');
                    if(textArray[i].length === 0) {
                        console.log("FOUND ZERO LENGTH");
                    }
                }

                for(var i = 0; i < textArray.length; ++i) {
                    if(maxWidth < textArray[i].length) {
                        maxWidth = textArray[i].length;
                    }
                }

                // If only one line, clean and then add brackets
                if (textArray.length === 1) {
                    //inputText[0] = inputText[0].substring(0, inputText[0].length-1)
                    maxWidth = textArray[0].length;
                    textArray[0] = " &#60;" + textArray[0] + "&#62;";
                } else {
                    // Otherwise, build a cool little bubble
                    textArray[0] = "/ " + textArray[0] + new Array(maxWidth - textArray[0].length + 1).join(' ') + " \\\n";
                    for (var i = 1; i < textArray.length - 1; ++i) {
                        textArray[i] = "| " + textArray[i] + new Array(maxWidth - textArray[i].length + 1).join(' ') + " |\n";
                    }
                    try {
                        textArray[textArray.length -1] = "\\ " + textArray[textArray.length -1] + new Array(maxWidth - textArray[textArray.length -1].length + 1).join(' ') + " /";
                    } catch(err) {
                        console.log("ERROR!!!");
                    }

                }

                // Based on size of text, create top and bottom bars
                // for textbox
                for(var i = 0; i < maxWidth; ++i) {
                    // Give bars some centering
                    if(i === 0) {
                        barsTop += "  ";
                        barsBot += "  ";
                    }
                    barsTop += "_";
                    barsBot += "-";
                }
            } while(textArray.join('').length === 0);

            cowsayTop.innerHTML = barsTop;
            cowsayBot.innerHTML = barsBot;
            cowsayOutput.innerHTML = textArray.join('');
        }
    })
});