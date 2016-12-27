document.addEventListener("DOMContentLoaded", function() {
    var lines;
    var randomN;

    var cabbage = `  \\     .-~~~~-.
   \\   /  ( ( ' \\
      | (  )  )  |
      \\ ) ' }  / /
      (\` \\ , /  ~)
       \`-.\`\\/_.-'
          \`""`;

    var cow = `  \\   ^__^
   \\  (oo)\\_______
      (__)\\ 0   0 )\\  *
          ||--0-w | \\/
          ||     ||`;

    var files = ["art", "ascii-art", "computers", "cookie", "definitions", "drugs", "education", "ethnic", "food", "fortunes", "goedel", "humorists", "kids", "law", "linuxcookie", "literature", "love", "magic", "medicine", "men-women", "miscellaneous", "news", "people", "pets", "platitudes", "politics", "riddles", "science", "songs-poems", "sports", "startrek", "translate-me", "wisdom", "work", "zippy"];
    var randF = parseInt(Math.random() * files.length);
    $.ajax({
        url: 'fortunes/' + files[randF]
    }).done(function(content){
        lines = content.split(/\n%\n/);
        if(lines && lines.length) {
            do {
                randomN = parseInt(Math.random() * lines.length);
                var cowsayRun = document.getElementById("cowsay-run");
                var cowsayOutput = document.getElementById("cowsay-output");
                var cowsayTop = document.getElementById("cowsay-barsTop");
                var cowsayBot = document.getElementById("cowsay-barsBot");
                var inputText = lines[randomN];
                var barsTop = "";
                var barsBot = "";
                var textArray = inputText.split('\n');
                var setText = "";
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

            chrome.storage.sync.get('vegan', (vegan) => {
                console.log(vegan);
                var speaker = (vegan.vegan) ? cabbage: cow;
                console.log(speaker)
                document.getElementsByTagName('pre')[0].innerHTML += speaker;
            })
        }
    })
});
