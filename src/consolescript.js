var i = 0;
var txt = 'Ryans Powershell|Copyright (C) Ryan Jakubielski Inc. All rights reserved.||For more information type help.||PS C:\\Home>'; /* The text */
var speed = 25; /* The speed/duration of the effect in milliseconds */
var running = true;

function typeWriter(str) {
    if (i < txt.length) {
        running = true;
        if (txt.charAt(i) != '|') {
            document.getElementById("console").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else if (txt.charAt(i) == '|') {
            document.getElementById("console").innerHTML += '<br>';
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    else
    {
        running = false;
    }
}
typeWriter()

var intervalIDBlink = window.setInterval(blink, 500);
function blink() {
    if (document.getElementById('cursor').classList.contains('invisible'))
    {
        document.getElementById('cursor').classList.remove('invisible');
    }
    else
    {
        document.getElementById('cursor').classList.add('invisible');
    }
}

var entry = document.getElementById('entry')
var commands = ['help', 'bio', 'featured', 'cls', 'funny']
var help = '|help - Displays all usable commands.||bio - Displays a brief bio of Ryan.||featured - Displays the current featured project and a brief description.||cls - Clears the console.||funny - Displays a joke.'
document.onkeydown = function (e) {
    const key = event.key;
    if (!running) {
        if (entry.innerHTML.length < 20 && 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.includes(key)) {
            entry.innerHTML += key;
        }
        if (key === "Backspace") {
            entry.innerHTML = entry.innerHTML.substring(0, entry.innerHTML.length-1);
        }
        if (key === "Enter") {
            if (entry.innerHTML == 'help') {
                let temp = entry.innerHTML;
                entry.innerHTML = '';
                document.getElementById("console").innerHTML += ' ' + temp;
                txt = help + '||PS C:\\Home>'
                i = 0
                typeWriter()
            }
            else if (entry.innerHTML == 'cls') {
                entry.innerHTML = '';
                document.getElementById('featuredimg').classList.addd('hidden')
                document.getElementById("console").innerHTML = ''
                txt = 'PS C:\\Home>'
                i = 0
                typeWriter()
            }
            else if (entry.innerHTML == 'funny') {
                let temp = entry.innerHTML;
                entry.innerHTML = '';
                document.getElementById("console").innerHTML += ' ' + temp;
                let api = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
                fetch(api).then((info) => info.json()).then((item) => {txt = `|${item.joke}||PS C:\\Home>`; i = 0; typeWriter()});
            }
            else if (entry.innerHTML == 'bio') {
                let temp = entry.innerHTML;
                let bio = "||Hello, my name is Ryan Jakubielski, and I am currently pursuing an associate's degree in software engineering and web development at the New England Institute of Technology. Growing up, I was fascinated with computer programming and started creating small mods for video games at a young age. However, I soon found myself spending more time making mods than playing games. Over the years, I learned about different programming languages and became enthralled with large complex algorithms that could simulate intelligent output. My love for AI led me to study Generative AI and Natural Language Processing, where I discovered the many challenges involved in generating text. As a result, I sought to develop my own solutions to these problems. Currently, I am attending NEIT with an unrelenting determination to succeed and am continually developing Natural Language Processing apps while exploring solutions to the current issues in Generative AI."
                entry.innerHTML = '';
                document.getElementById("console").innerHTML += ' ' + temp;
                txt = bio + '||PS C:\\Home>'
                i = 0
                typeWriter()
            }
            else if (entry.innerHTML == 'featured') {
                let temp = entry.innerHTML;
                let bio = "||Introducing my upcoming website for a Wild West Fantasy Dungeons and Dragons campaign. With a figma-inspired design, the site will feature a live map, rich world lore, quests, and rumors for players to explore. Prepare to embark on an immersive journey where cowboys and magic converge. Coming soon, this website will offer an intuitive navigation system, allowing adventurers to chart their course and uncover epic quests that shape the frontier. Stay tuned for the official launch and join me in forging a new chapter in this captivating blend of the wild west and fantasy realms."
                document.getElementById('featuredimg').classList.remove('hidden')
                entry.innerHTML = '';
                document.getElementById("console").innerHTML += ' ' + temp;
                txt = bio + '||PS C:\\Home>'
                i = 0
                typeWriter()
            }
            else if (entry.innerHTML.split(' ')[0] == 'color') {
                if (entry.innerHTML.split(' ')[1].length == 3 || entry.innerHTML.split(' ')[1].length == 6)
                {
                    let color = entry.innerHTML.split(' ');
                    color = color[1]
                    if (color === '000' || color === '000000') {
                        temp = entry.innerHTML;
                        entry.innerHTML = '';
                        document.getElementById("console").innerHTML += ' ' + temp;
                        txt = `|Dont be silly.||PS C:\\Home>`
                        i = 0
                        typeWriter()
                    }
                    else {
                        graphics = document.getElementsByClassName("svg-graphic")
                        for (img = 0; img < graphics.length; img++) {
                            graphics[img].style.stroke = `#${color}`;
                        }
                        graphicsfill = document.getElementsByClassName("svg-graphic-fill")
                        for (fils = 0; fils < graphicsfill.length; fils++) {
                            graphicsfill[fils].style.fill = `#${color}`;
                        }
                        texts = document.getElementsByClassName("color-text")
                        for (ct = 0; ct < texts.length; ct++) {
                            texts[ct].style.color = `#${color}`;
                        }
                        document.getElementById("date").style.borderColor = `#${color}`;
                        temp = entry.innerHTML;
                        entry.innerHTML = '';
                        document.getElementById("console").innerHTML += ' ' + temp;
                        txt = `|color has been changed to ${color}.||PS C:\\Home>`
                        i = 0
                        typeWriter()
                        localStorage.setItem('color', color)
                    }
                } else {
                    temp = entry.innerHTML;
                    entry.innerHTML = '';
                    document.getElementById("console").innerHTML += ' ' + temp;
                    txt = `|'${temp.split(' ')[1]}' is not a valid hex color.||PS C:\\Home>`
                    i = 0
                    typeWriter()
                }
            }
            else {
                temp = entry.innerHTML;
                entry.innerHTML = '';
                document.getElementById("console").innerHTML += ' ' + temp;
                txt = `|'${temp}' is not a recognized command.||PS C:\\Home>`
                i = 0
                typeWriter()
            }
        }
    }
};