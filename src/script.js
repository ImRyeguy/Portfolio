datetime()
var intervalID = window.setInterval(datetime, 1000);
function datetime() {
    var currentdate = new Date(); 
    var date = (currentdate.getMonth()+1) + "/" + currentdate.getDate()  + "/"  + currentdate.getFullYear();
    var time = currentdate.getHours() + ":"   + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    document.getElementById('time').innerHTML = time;
    document.getElementById('date').innerHTML = date;
}

var color = localStorage.getItem("color");
var graphics = document.getElementsByClassName("svg-graphic")
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


var tabs = document.getElementsByClassName('tabs')
document.getElementById('tab1').addEventListener("click", (e) => {
    window.open("./projects.html","_self")
});

document.getElementById('tab0').addEventListener("click", (e) => {
    window.open("./index.html","_self")
});

document.getElementById('tab2').addEventListener("click", (e) => {
    window.open("./featured.html","_self")
});

document.getElementById('github').addEventListener("click", (e) => {
    window.open("https://github.com/MyNameIsRyanJ","_self")
});

const {host, hostname, href, origin, pathname, port, protocol, search} = window.location
if ((localStorage.getItem("tab0") === 'false') && !(href.includes('index.html'))) {
    tabs[0].classList.add('hidden')
}
if ((localStorage.getItem("tab1") === 'false') && !(href.includes('projects.html'))) {
    tabs[1].classList.add('hidden')
}
if (localStorage.getItem("tab2") === 'false') {
    tabs[2].classList.add('hidden')
}

var closebtns = document.getElementsByClassName('close-button')
for (let btn = 0; btn < closebtns.length; btn++) {
    closebtns[btn].addEventListener("click", (e) => {
        e.stopPropagation();
        if (!tabs[btn].classList.contains('bg-black')) {
            tabs[btn].classList.add('hidden')
            localStorage.setItem(`tab${btn}`, false);
        }
    });
}

document.getElementById('add-button').addEventListener("click", (e) => {
    for (let tab = 0; tab < tabs.length; tab++) {
        if (tabs[tab].classList.contains('hidden')) {
            tabs[tab].classList.remove('hidden');
            localStorage.setItem(`tab${tab}`, true);
            break;
        }
    }
});
/*
window.addEventListener("resize", (e) => {
    var current = false;
    if (window.innerWidth < 960 && current == false) {
        let grap = document.querySelectorAll('svg-graphic')
        console.log(window.innerWidth)
        current = true;
        for (let g = 0; g < grap.length; g++) {
            if (grap[g].classList.contains('w-6')) {
                grap[g].classList.remove('w-6')
                grap[g].classList.remove('h-6')
                grap[g].classList.add('w-4')
                grap[g].classList.add('h-4')
            } else if (grap[g].classList.contains('w-8')) {
                grap[g].classList.remove('w-8')
                grap[g].classList.remove('h-8')
                grap[g].classList.add('w-6')
                grap[g].classList.add('h-6')
            } else if (grap[g].classList.contains('w-10')) {
                grap[g].classList.remove('w-10')
                grap[g].classList.remove('h-10')
                grap[g].classList.add('w-8')
                grap[g].classList.add('h-8')
            } else if (grap[g].classList.contains('w-12')) {
                grap[g].classList.remove('w-12')
                grap[g].classList.remove('h-12')
                grap[g].classList.add('w-10')
                grap[g].classList.add('h-10')
            } else if (grap[g].classList.contains('w-14')) {
                grap[g].classList.remove('w-14')
                grap[g].classList.remove('h-14')
                grap[g].classList.add('w-12')
                grap[g].classList.add('h-12')
            }
        }
    } else if (current && window.innerWidth > 960) {
        let grap = document.querySelectorAll('svg-graphic')
        current = true;
        for (let g = 0; g < grap.length; g++) {
            if (grap[g].classList.contains('w-8')) {
                grap[g].classList.remove('w-8')
                grap[g].classList.remove('h-8')
                grap[g].classList.add('w-10')
                grap[g].classList.add('h-10')
            } else if (grap[g].classList.contains('w-6')) {
                grap[g].classList.remove('w-6')
                grap[g].classList.remove('h-6')
                grap[g].classList.add('w-8')
                grap[g].classList.add('h-8')
            } else if (grap[g].classList.contains('w-4')) {
                grap[g].classList.remove('w-4')
                grap[g].classList.remove('h-4')
                grap[g].classList.add('w-6')
                grap[g].classList.add('h-6')
            }
        }
        current = false;
    }
});
*/