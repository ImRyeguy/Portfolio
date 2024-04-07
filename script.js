var textloc = document.querySelector(`#text-area`);
var displayloc = document.querySelector(`#display`);
var textOnScreen = textloc.innerHTML;
var textToAdd = 'Welcome to Ryan Industries Terminal|Powered By RJOS|||Please wait while terminal loads|BOOTING BIOS|.|LOADING ............|.|LOADING ............|.|.|BIOS Loaded|.|BOOTING OS|.|LOADING ............|.|LOADING ............|.|LOADING ............|.|Loading Login|.|LOADING ............|.|Logging In as Guest|';
var waitTimer = 10;
var isBoot = true;
var isLogin = false;
var isMainScreen = false;

var isAbout = false;
var isFeatured = false;
var isProjects = false;
var isUpcoming = false;
var isChat = false;
var isSettings = false;
var isTyping = false;

const projDir = "./projects/";
const projFiles = [`musicmadness.json`, `pixelpaintbrush.json`, `portfolio.json`]
const featDir = "./featured/featured.json";
const upDir = "./upcoming/";

var featProjData = [];
var projDataList = [];
var projLoaded = false;

var userName = `Guest`;

var isDarkMode = true;
if (localStorage.getItem(`isDarkMode`) != null)
{
    isDarkMode = JSON.parse(localStorage.getItem(`isDarkMode`));
}
var colorTheme = `#5bf870`;
if (localStorage.getItem(`colorTheme`) != null)
{
    colorTheme = localStorage.getItem(`colorTheme`);
}

var poweredOn = false;

var fileImage = `<svg class="fileImages" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${colorTheme}" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>`;


async function projDataLoad(filedir) {
    const response = await fetch(filedir);
    const json = await response.json();
    projDataList.push(json);
}

async function featDataLoad(filedir) {
    const response = await fetch(filedir);
    const json = await response.json();
    featProjData.push(json);
}

async function loadProjects()
{
    for (let i = 0; i < projFiles.length; i++)
    {
        await projDataLoad(projDir + projFiles[i]);
    }
    projLoaded = true;
}

loadProjects();
featDataLoad(featDir);

function applyTextColor(textColor)
{
    document.querySelector(`body`).style.color = textColor;
    fileImage = `<svg class="fileImages" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${textColor}" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>`;
    let images = document.querySelectorAll(`.fileImages`);
    for (let i = 0; i < images.length; i++)
    {
        images[i].style.stroke = textColor;
    }
    if (isDarkMode)
    {
        textloc.style.scrollbarColor = `rgb(9, 9, 11) ${textColor}`;
        displayloc.style.scrollbarColor = `rgb(9, 9, 11) ${textColor}`;
    }
    else
    {
        textloc.style.scrollbarColor = `rgb(212, 212, 216) ${textColor}`;
        displayloc.style.scrollbarColor = `rgb(212, 212, 216) ${textColor}`;
    }
}

function setColorTheme(color)
{
    let hovers = document.querySelectorAll(`.isHover`);
    for (let i = 0; i < hovers.length; i++)
    {
        hovers[i].classList.remove(`hover:bg-[${colorTheme}]`);
        hovers[i].classList.add(`hover:bg-[${color}]`);
    }
    textloc.classList.remove(`border-[#5bf870]`);
    displayloc.classList.remove(`border-[#5bf870]`);
    textloc.classList.remove(`border-[${colorTheme}]`);
    textloc.classList.add(`border-[${color}]`)
    displayloc.classList.remove(`border-[${colorTheme}]`);
    displayloc.classList.add(`border-[${color}]`)
    if (poweredOn)
    {
        document.querySelector(`#pwr-light`).classList.remove(`border-[${colorTheme}]`);
        document.querySelector(`#pwr-light`).classList.add(`border-[${color}]`);
        document.querySelector(`#pwr-bar`).classList.remove(`bg-[${colorTheme}]`);
        document.querySelector(`#pwr-bar`).classList.add(`bg-[${color}]`);
    }
    colorTheme = color;
    localStorage.setItem(`colorTheme`, colorTheme);
    applyTextColor(colorTheme);
}

function lightMode()
{
    isDarkMode = false;
    console.log(isDarkMode);
    localStorage.setItem(`isDarkMode`, isDarkMode);
    applyTheme();
}

function darkMode()
{
    isDarkMode = true;
    localStorage.setItem(`isDarkMode`, isDarkMode);
    applyTheme();
}

function applyTheme()
{
    let screenElem = document.querySelector(`#screen`);
    let lines = document.querySelector(`#lines`);
    if (isDarkMode && screenElem.classList.contains(`bg-zinc-300`))
    {
        screenElem.classList.remove(`bg-zinc-300`);
        screenElem.classList.add(`bg-zinc-950`);
    }
    else if (!isDarkMode && screenElem.classList.contains(`bg-zinc-950`))
    {
        screenElem.classList.remove(`bg-zinc-950`);
        screenElem.classList.add(`bg-zinc-300`);
    }
    if (isDarkMode)
    {
        lines.classList.remove(`from-[rgba(255,255,255,0)]`);
        lines.classList.remove(`to-[rgba(255,255,255,0.1)]`);
        lines.classList.add(`from-[rgba(18,16,16,0)]`);
        lines.classList.add(`to-[rgba(0,0,0,0.25)]`);
    }
    else if (!isDarkMode)
    {
        lines.classList.remove(`from-[rgba(18,16,16,0)]`);
        lines.classList.remove(`to-[rgba(0,0,0,0.25)]`);
        lines.classList.add(`from-[rgba(255,255,255,0)]`);
        lines.classList.add(`to-[rgba(255,255,255,0.1)]`);
    }
    if (isDarkMode)
    {
        textloc.style.scrollbarColor = `rgb(9, 9, 11) ${colorTheme}`;
        displayloc.style.scrollbarColor = `rgb(9, 9, 11) ${colorTheme}`;
    }
    else
    {
        textloc.style.scrollbarColor = `rgb(212, 212, 216) ${colorTheme}`;
        displayloc.style.scrollbarColor = `rgb(212, 212, 216) ${colorTheme}`;
    }
}

function updateScroll(){
    var element = document.getElementById("text-area");
    element.scrollTop = element.scrollHeight;
}

function writeToScreen()
{
    if (textToAdd != '')
    {
        if (textToAdd[0] == '|')
        {
            textOnScreen = textOnScreen + `<br>`;
            textloc.innerHTML = textOnScreen;
            textToAdd = textToAdd.substring(1);
            setTimeout(writeToScreen, waitTimer+10);
        }
        else
        {
            textOnScreen = textOnScreen + textToAdd[0];
            textloc.innerHTML = textOnScreen;
            textToAdd = textToAdd.substring(1);
            setTimeout(writeToScreen, waitTimer);
        }
    }
    else
    {
        if (isBoot)
        {
            isBoot = false;
            isLogin = true;
            setTimeout(wipeScreenToLogin, 500);
        }
        else if (isLogin)
        {
            let tempdiv = document.createElement(`div`);
            tempdiv.innerHTML = `Name: `;
            tempdiv.classList.add(`flex`);
            let nameInp = document.createElement(`input`);
            nameInp.type = `text`;
            nameInp.id = `nameInp`;
            nameInp.classList.add(`w-full`, `bg-transparent`);
            nameInp.style.border = `none`;
            nameInp.addEventListener(`keydown`, function(e){
                if (e.key == `Enter`)
                {
                    if (nameInp.value == '')
                    {
                        userName = `Unknown User`
                    }
                    else
                    {
                        userName = nameInp.value;
                    }
                    isLogin = false;
                    isMainScreen = true;
                    textToAdd = `Hello ` + userName + `|Please select a page to vist:||Home|About Me|Featured Project|Projects|Upcoming Projects|Settings`; //|Chat with AI Me`;
                    textOnScreen = '';
                    textloc.innerHTML = '';
                    setTimeout(writeToScreen, 100);
                }
            });
            tempdiv.appendChild(nameInp);
            textloc.appendChild(tempdiv);
        }
        else if (isMainScreen)
        {
            let homeSpan = document.createElement(`span`);
            homeSpan.innerHTML = `Home`;
            homeSpan.classList.add(`cursor-pointer`);
            homeSpan.classList.add(`hover:bg-[${colorTheme}]`);
            homeSpan.classList.add(`isHover`);
            homeSpan.classList.add(`hover:text-black`);
            homeSpan.addEventListener(`click`, homeScreen);
            let aboutSpan = document.createElement(`span`);
            aboutSpan.innerHTML = `About Me`;
            aboutSpan.classList.add(`cursor-pointer`);
            aboutSpan.classList.add(`hover:bg-[${colorTheme}]`);
            aboutSpan.classList.add(`isHover`);
            aboutSpan.classList.add(`hover:text-black`);
            aboutSpan.addEventListener(`click`, aboutScreen);
            let featuredSpan = document.createElement(`span`);
            featuredSpan.innerHTML = `Featured Project`;
            featuredSpan.classList.add(`cursor-pointer`);
            featuredSpan.classList.add(`hover:bg-[${colorTheme}]`);
            featuredSpan.classList.add(`isHover`);
            featuredSpan.classList.add(`hover:text-black`);
            featuredSpan.addEventListener(`click`, featuredScreen);
            let projectsSpan = document.createElement(`span`);
            projectsSpan.innerHTML = `Projects`;
            projectsSpan.classList.add(`cursor-pointer`);
            projectsSpan.classList.add(`hover:bg-[${colorTheme}]`);
            projectsSpan.classList.add(`isHover`);
            projectsSpan.classList.add(`hover:text-black`);
            projectsSpan.addEventListener(`click`, projectsScreen);
            let upcomingSpan = document.createElement(`span`);
            upcomingSpan.innerHTML = `Upcoming Projects`;
            upcomingSpan.classList.add(`cursor-pointer`);
            upcomingSpan.classList.add(`hover:bg-[${colorTheme}]`);
            upcomingSpan.classList.add(`isHover`);
            upcomingSpan.classList.add(`hover:text-black`);
            upcomingSpan.addEventListener(`click`, upcomingScreen);
            let settingsSpan = document.createElement(`span`);
            settingsSpan.innerHTML = `Settings`;
            settingsSpan.classList.add(`cursor-pointer`);
            settingsSpan.classList.add(`hover:bg-[${colorTheme}]`);
            settingsSpan.classList.add(`isHover`);
            settingsSpan.classList.add(`hover:text-black`);
            settingsSpan.addEventListener(`click`, settingsScreen);
            /*
            let chatSpan = document.createElement(`span`);
            chatSpan.innerHTML = `Chat with AI Me`;
            chatSpan.classList.add(`cursor-pointer`);
            chatSpan.classList.add(`hover:bg-[${colorTheme}]`);
            chatSpan.classList.add(`hover:text-black`);
            chatSpan.addEventListener(`click`, chatScreen);*/
            textloc.innerHTML = `Hello ` + userName + `<br>Please select a page to vist:<br><br>`;
            textloc.appendChild(homeSpan);
            textloc.appendChild(document.createElement(`br`));
            textloc.appendChild(aboutSpan);
            textloc.appendChild(document.createElement(`br`));
            textloc.appendChild(featuredSpan);
            textloc.appendChild(document.createElement(`br`));
            textloc.appendChild(projectsSpan);
            textloc.appendChild(document.createElement(`br`));
            textloc.appendChild(upcomingSpan);
            textloc.appendChild(document.createElement(`br`));
            textloc.appendChild(settingsSpan);
            //textloc.appendChild(document.createElement(`br`));
            //textloc.appendChild(chatSpan);
        }
    }
    updateScroll();
}

var asciiDiv = ``;

function homeScreen()
{
    if (isTyping)
    {
        return;
    }
    if (displayloc.classList.contains(`flex`))
    {
        displayloc.classList.remove(`flex`, `flex-col`, `justify-between`, `text-center`, `items-center`);
    }
    displayloc.classList.add(`flex`, `flex-col`, `justify-between`, `text-center`, `items-center`);
    displayloc.innerHTML = `<h1 class="text-3xl">Ryan's Portfolio</h1>`;
    asciiDiv = document.createElement(`div`);
    asciiDiv.classList.add(`text-2xl`, `flex`, `justify-center`, `text-center`, `items-center`);
    displayloc.appendChild(asciiDiv);
    let gitLink = document.createElement(`a`);
    gitLink.innerHTML = `Visit my Github @ImRyeguy`;
    gitLink.href = `https://github.com/ImRyeguy`;
    gitLink.target = `_blank`;
    gitLink.classList.add(`cursor-pointer`);
    gitLink.classList.add(`hover:bg-[${colorTheme}]`);
    gitLink.classList.add(`isHover`);
    gitLink.classList.add(`hover:text-black`);
    gitLink.classList.add(`font-bold`);
    displayloc.appendChild(gitLink);
    displayTextToAdd = '+--------------+\n|.------------.|\n||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||\n||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||\n||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||\n||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||\n|+------------+|\n+-..--------..-+\n.--------------.\n/&nbsp;/============\\&nbsp;\\\n/&nbsp;/==============\\&nbsp;\\\n/____________________\\\n\\____________________/\n\n';
    displayTextOnScreen = '';
    setTimeout(writeToASCIIDisplay, 100);
    isAbout = false;
    isFeatured = false;
    isProjects = false;
    isUpcoming = false;
    isChat = false;
}

var displayTextToAdd = '+--------------+\n|.------------.|\n||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||\n||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||\n||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||\n||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||\n|+------------+|\n+-..--------..-+\n.--------------.\n/&nbsp;/============\\&nbsp;\\\n/&nbsp;/==============\\&nbsp;\\\n/____________________\\\n\\____________________/\n\n';
var displayTextOnScreen = '';

function writeToASCIIDisplay()
{
    if (displayTextToAdd != '')
    {
        if (displayTextToAdd[0] == '\n')
        {
            displayTextOnScreen = displayTextOnScreen + `<br>`;
            asciiDiv.innerHTML = displayTextOnScreen;
            displayTextToAdd = displayTextToAdd.substring(1);
            setTimeout(writeToASCIIDisplay, waitTimer+20);
        }
        if (displayTextToAdd[0] == '&' && displayTextToAdd[1] == 'n' && displayTextToAdd[2] == 'b' && displayTextToAdd[3] == 's' && displayTextToAdd[4] == 'p' && displayTextToAdd[5] == ';')
        {
            displayTextOnScreen = displayTextOnScreen + `&nbsp;`;
            asciiDiv.innerHTML = displayTextOnScreen;
            displayTextToAdd = displayTextToAdd.substring(6);
            setTimeout(writeToASCIIDisplay, waitTimer+20);
        }
        else
        {
            displayTextOnScreen = displayTextOnScreen + displayTextToAdd[0];
            asciiDiv.innerHTML = displayTextOnScreen;
            displayTextToAdd = displayTextToAdd.substring(1);
            setTimeout(writeToASCIIDisplay, waitTimer+10);
        }
    }
}

function writeToDisplay()
{
    if (displayTextToAdd != '')
    {
        isTyping = true;
        if (displayTextToAdd[0] == '|')
        {
            displayTextOnScreen = displayTextOnScreen + `<br>`;
            displayloc.innerHTML = displayTextOnScreen;
            displayTextToAdd = displayTextToAdd.substring(1);
            setTimeout(writeToDisplay, waitTimer+10);
        }
        else
        {
            displayTextOnScreen = displayTextOnScreen + displayTextToAdd[0];
            displayloc.innerHTML = displayTextOnScreen;
            displayTextToAdd = displayTextToAdd.substring(1);
            setTimeout(writeToDisplay, waitTimer);
        }
    }
    else
    {
        if (isAbout)
        {
            isAbout = false;
            displayloc.innerHTML = `<h2 class="text-2xl">About Me</h2><br>Hi I'm Ryan Jakubielski, a motivated software development professional passionate about HTML, CSS, and JavaScript. Known for my quick learning and strong communication skills, I thrive in collaborative environments. Whether crafting intuitive interfaces or leveraging APIs for innovative solutions like Music Madness, I'm dedicated to creating impactful experiences through technology. With a background in customer service and a commitment to growth, I'm ready to contribute my skills to the world of software development.<br>Have a great day and please visit me on Github!<br>`
            let gitLink = document.createElement(`a`);
            gitLink.innerHTML = `@ImRyeguy`;
            gitLink.href = `https://github.com/ImRyeguy`;
            gitLink.target = `_blank`;
            gitLink.classList.add(`cursor-pointer`);
            gitLink.classList.add(`hover:bg-[${colorTheme}]`);
            gitLink.classList.add(`isHover`);
            gitLink.classList.add(`hover:text-black`);
            gitLink.classList.add(`font-bold`);
            displayloc.appendChild(gitLink);
        }
        else if (isFeatured)
        {
            isFeatured = false;
            displayloc.innerHTML = `<h2 class="text-2xl">Featured Project - ${featProjData[0].name}</h2><br>${featProjData[0].desc}<br>`
            let repoLink = document.createElement(`a`);
            repoLink.innerHTML = `@Repo`;
            repoLink.href = `${featProjData[0].repo}`;
            repoLink.target = `_blank`;
            repoLink.classList.add(`cursor-pointer`);
            repoLink.classList.add(`hover:bg-[${colorTheme}]`);
            repoLink.classList.add(`isHover`);
            repoLink.classList.add(`hover:text-black`);
            repoLink.classList.add(`font-bold`);
            displayloc.appendChild(repoLink);
            let imgDiv = document.createElement(`div`);
            imgDiv.classList.add(`flex`, `justify-center`, `items-center`);
            let imgDiv2 = document.createElement(`div`);
            imgDiv2.classList.add(`flex`, `justify-center`, `items-center`);
            let img1 = document.createElement(`img`);
            img1.src = `${featProjData[0].images[0]}`;
            img1.classList.add(`w-2/3`, `h-auto`, `border-2`, `border-[${colorTheme}]`);
            imgDiv.appendChild(img1);
            let img2 = document.createElement(`img`);
            img2.src = `${featProjData[0].images[1]}`;
            img2.classList.add(`w-1/2`, `h-auto`, `border-2`, `border-[${colorTheme}]`);
            imgDiv2.appendChild(img2);
            let img3 = document.createElement(`img`);
            img3.src = `${featProjData[0].images[2]}`;
            img3.classList.add(`w-1/2`, `h-auto`, `border-2`, `border-[${colorTheme}]`);
            imgDiv2.appendChild(img3);
            displayloc.appendChild(imgDiv);
            displayloc.appendChild(imgDiv2);
        }
        else if (isSettings)
        {
            isSettings = false;
            displayloc.innerHTML = `<h2 class="text-2xl">Settings</h2><br>Theme<br>`;
            let lightThemeSpan = document.createElement(`span`);
            lightThemeSpan.innerHTML = `Light`;
            lightThemeSpan.classList.add(`cursor-pointer`);
            lightThemeSpan.classList.add(`hover:bg-[${colorTheme}]`);
            lightThemeSpan.classList.add(`isHover`);
            lightThemeSpan.classList.add(`hover:text-black`);
            lightThemeSpan.addEventListener(`click`, lightMode);
            let darkThemeSpan = document.createElement(`span`);
            darkThemeSpan.innerHTML = `Dark`;
            darkThemeSpan.classList.add(`cursor-pointer`);
            darkThemeSpan.classList.add(`hover:bg-[${colorTheme}]`);
            darkThemeSpan.classList.add(`isHover`);
            darkThemeSpan.classList.add(`hover:text-black`);
            darkThemeSpan.addEventListener(`click`, darkMode);
            let colorThemeSelector = document.createElement(`input`);
            colorThemeSelector.type = `color`;
            colorThemeSelector.value = colorTheme;
            colorThemeSelector.classList.add(`cursor-pointer`, `border-0`, `bg-transparent`);
            colorThemeSelector.addEventListener(`change`, e => {
                setColorTheme(e.target.value);
            });
            let dashspan = document.createElement(`span`);
            dashspan.innerHTML = `- `;
            let dashspan2 = document.createElement(`span`);
            dashspan2.innerHTML = `- `;
            let dashspan3 = document.createElement(`span`);
            dashspan3.innerHTML = `- `;
            let colorspan = document.createElement(`span`);
            colorspan.innerHTML = `Color`;
            displayloc.appendChild(dashspan);
            displayloc.appendChild(darkThemeSpan);
            displayloc.appendChild(document.createElement(`br`));
            displayloc.appendChild(dashspan2);
            displayloc.appendChild(lightThemeSpan);
            displayloc.appendChild(document.createElement(`br`));
            displayloc.appendChild(colorspan);
            displayloc.appendChild(document.createElement(`br`));
            displayloc.appendChild(dashspan3);
            displayloc.appendChild(colorThemeSelector);
        }
        isTyping = false;
    }
}


var projDivs = [];
var projDivsIndex = 0;

var selectedDivUnder = ``;
var selectedDivUnderWriteTo = ``;
var selectedDivUnderIndex = 0;

function writeToDisplayProjects()
{
    if (displayTextToAdd != '')
    {
        isTyping = true;
        if (displayTextToAdd[0] == '|')
        {
            projDivsIndex++;
            displayloc.appendChild(projDivs[projDivsIndex]);
            let divBelow = document.createElement(`div`);
            divBelow.id = `projDivUnder${projDivsIndex}`;
            divBelow.classList.add(`pl-2`, `flex`);
            displayloc.appendChild(divBelow);
            projDivs[projDivsIndex].innerHTML = `${fileImage}`;
            displayTextToAdd = displayTextToAdd.substring(1);
            setTimeout(writeToDisplayProjects, waitTimer+10);
        }
        else
        {
            projDivs[projDivsIndex].innerHTML = projDivs[projDivsIndex].innerHTML + displayTextToAdd[0];
            displayTextToAdd = displayTextToAdd.substring(1);
            setTimeout(writeToDisplayProjects, waitTimer);
        }
    }
    else
    {
        isProjects = false;
        isTyping = false;
        for (let i = 0; i < projDivs.length; i++)
        {
            projDivs[i].innerHTML = `${fileImage}`
            let divSpan = document.createElement(`span`);
            divSpan.innerHTML = projDataList[i].name;
            divSpan.classList.add(`cursor-pointer`);
            divSpan.classList.add(`hover:bg-[${colorTheme}]`);
            divSpan.classList.add(`isHover`);
            divSpan.classList.add(`hover:text-black`);
            divSpan.classList.add(`text-center`);
            projDivs[i].appendChild(divSpan);
            divSpan.addEventListener(`click`, e => {
                if (isTyping)
                {
                    return;
                }
                if (selectedDivUnder == document.getElementById(`projDivUnder${i}`))
                {
                    return;
                }
                selectedDivUnder = document.getElementById(`projDivUnder${i}`);
                selectedDivUnderIndex = i;
                for (var x = 0; x < projDivs.length; x++)
                {
                    document.getElementById(`projDivUnder${x}`).innerHTML = '';
                }
                displayTextToAdd = `${projDataList[i].desc}|`;
                selectedDivUnderWriteTo = document.createElement(`div`);
                selectedDivUnderWriteTo.id = `projDivUnder${i}writeto`;
                selectedDivUnder.innerHTML = `<div class="pr-2">└</div>`;
                selectedDivUnder.appendChild(selectedDivUnderWriteTo);
                writeToDisplayProjectsUnder();
            });
        }
    }
}

function writeToDisplayProjectsUnder()
{
    if (displayTextToAdd != '')
    {
        isTyping = true;
        if (displayTextToAdd[0] == '|')
        {
            selectedDivUnderWriteTo.innerHTML += `<br>`;
            displayTextToAdd = displayTextToAdd.substring(1);
            setTimeout(writeToDisplayProjectsUnder, waitTimer+10);
        }
        else
        {
            selectedDivUnderWriteTo.innerHTML = selectedDivUnderWriteTo.innerHTML + displayTextToAdd[0];
            displayTextToAdd = displayTextToAdd.substring(1);
            setTimeout(writeToDisplayProjectsUnder, waitTimer);
        }
    }
    else
    {
        isTyping = false;
        let repoLink = document.createElement(`a`);
        repoLink.innerHTML = `@Repo`;
        repoLink.href = projDataList[selectedDivUnderIndex].repo;
        repoLink.target = `_blank`;
        repoLink.classList.add(`cursor-pointer`);
        repoLink.classList.add(`hover:bg-[${colorTheme}]`);
        repoLink.classList.add(`isHover`);
        repoLink.classList.add(`hover:text-black`);
        repoLink.classList.add(`font-bold`);
        selectedDivUnderWriteTo.appendChild(repoLink);
    }
}

function aboutScreen()
{
    if (isTyping)
    {
        return;
    }
    if (displayloc.classList.contains(`flex`))
    {
        displayloc.classList.remove(`flex`, `flex-col`, `justify-between`, `text-center`, `items-center`);
    }
    displayloc.innerHTML = ``;
    displayTextToAdd = `Hi I'm Ryan Jakubielski, a motivated software development professional passionate about HTML, CSS, and JavaScript. Known for my quick learning and strong communication skills, I thrive in collaborative environments. Whether crafting intuitive interfaces or leveraging APIs for innovative solutions like Music Madness, I'm dedicated to creating impactful experiences through technology. With a background in customer service and a commitment to growth, I'm ready to contribute my skills to the world of software development.|Have a great day and please visit me on Github!|@ImRyeguy`;
    displayTextOnScreen = '<h2 class="text-2xl">About Me</h2><br>';
    setTimeout(writeToDisplay, 100);
    isAbout = true;
    isFeatured = false;
    isProjects = false;
    isUpcoming = false;
    isSettings = false;
    isChat = false;
}

function featuredScreen()
{
    if (isTyping)
    {
        return;
    }
    if (featProjData.length == 0)
    {
        displayloc.innerHTML = `<h2 class="text-2xl">Featured Project</h2><br>Loading Featured Project...`;
        setTimeout(projectsScreen, 100);
        return;
    }
    if (displayloc.classList.contains(`flex`))
    {
        displayloc.classList.remove(`flex`, `flex-col`, `justify-between`, `text-center`, `items-center`);
    }
    displayloc.innerHTML = ``;
    displayTextToAdd = `${featProjData[0].desc}|@Repo`;
    displayTextOnScreen = `<h2 class="text-2xl">Featured Project - ${featProjData[0].name}</h2><br>`;
    setTimeout(writeToDisplay, 100);
    isAbout = false;
    isFeatured = true;
    isProjects = false;
    isUpcoming = false;
    isSettings = false;
    isChat = false;
}

function projectsScreen()
{
    if (isTyping)
    {
        return;
    }
    if (displayloc.classList.contains(`flex`))
    {
        displayloc.classList.remove(`flex`, `flex-col`, `justify-between`, `text-center`, `items-center`);
    }
    if (!projLoaded)
    {
        displayloc.innerHTML = `<h2 class="text-2xl">Projects</h2><br>Loading Projects...`;
        setTimeout(projectsScreen, 100);
        return;
    }
    projDivs = [];
    for (var i = 0; i < projDataList.length; i++)
    {
        projDivs.push(document.createElement(`div`));
        projDivs[i].classList.add(`projDiv`);
        projDivs[i].id = `projDiv${i}`;
        projDivs[i].classList.add(`flex`, `text-lg`, `text-center`);
    }
    projDivsIndex = 0;
    displayTextToAdd = ``;
    for (let i = 0; i < projDataList.length; i++)
    {
        if (i != projDataList.length - 1)
        {
            displayTextToAdd = displayTextToAdd + `${projDataList[i].name}|`;
        }
        else
        {
            displayTextToAdd = displayTextToAdd + `${projDataList[i].name}`;
        }
    }
    displayloc.innerHTML = '<h2 class="text-2xl">Projects</h2><br>';
    displayloc.appendChild(projDivs[projDivsIndex]);
    projDivs[projDivsIndex].innerHTML = `${fileImage}`;
    let divBelow = document.createElement(`div`);
    divBelow.id = `projDivUnder${projDivsIndex}`;
    divBelow.classList.add(`pl-2`, `flex`);
    displayloc.appendChild(divBelow);
    setTimeout(writeToDisplayProjects, 100);
    isAbout = false;
    isFeatured = false;
    isProjects = true;
    isUpcoming = false;
    isSettings = false;
    isChat = false;
}

function upcomingScreen()
{
    if (isTyping)
    {
        return;
    }
    if (displayloc.classList.contains(`flex`))
    {
        displayloc.classList.remove(`flex`, `flex-col`, `justify-between`, `text-center`, `items-center`);
    }
    displayloc.innerHTML = ``;
    displayTextToAdd = `Upcoming Projects are currently under construction|Please check back later`;
    displayTextOnScreen = '<h2 class="text-2xl">Upcoming Projects</h2><br>';
    setTimeout(writeToDisplay, 100);
    isAbout = false;
    isFeatured = false;
    isProjects = false;
    isUpcoming = true;
    isSettings = false;
    isChat = false;
}

function settingsScreen()
{
    if (isTyping)
    {
        return;
    }
    if (displayloc.classList.contains(`flex`))
    {
        displayloc.classList.remove(`flex`, `flex-col`, `justify-between`, `text-center`, `items-center`);
    }
    displayloc.innerHTML = ``;
    displayTextToAdd = `Theme|- Dark|- Light|Color`;
    displayTextOnScreen = '<h2 class="text-2xl">Settings</h2><br>';
    setTimeout(writeToDisplay, 100);
    isAbout = false;
    isFeatured = false;
    isProjects = false;
    isUpcoming = false;
    isSettings = true;
    isChat = false;
}

function chatScreen()
{
    if (isTyping)
    {
        return;
    }
    if (displayloc.classList.contains(`flex`))
    {
        displayloc.classList.remove(`flex`, `flex-col`, `justify-between`, `text-center`, `items-center`);
    }
    displayloc.innerHTML = ``;
    displayTextToAdd = `Chat is currently under construction|Please check back later`;
    displayTextOnScreen = '<h2 class="text-2xl">Chat with AI Me</h2><br>';
    setTimeout(writeToDisplay, 100);
    isAbout = false;
    isFeatured = false;
    isProjects = false;
    isUpcoming = false;
    isSettings = false;
    isChat = true;
}

function wipeScreenToLogin()
{
    textloc.innerHTML = '';
    textOnScreen = '';
    textToAdd = 'Hello Guest|What is your Name?'
    setTimeout(writeToScreen, 100)
}

setColorTheme(colorTheme);
applyTheme();
document.querySelector(`#pwr-button`).addEventListener(`click`, function(){
    poweredOn = !poweredOn;
    if (poweredOn)
    {
        document.querySelector(`#pwr-light`).classList.remove(`border-zinc-500`);
        document.querySelector(`#pwr-light`).classList.add(`border-[${colorTheme}]`);
        document.querySelector(`#pwr-bar`).classList.remove(`bg-zinc-500`);
        document.querySelector(`#pwr-bar`).classList.add(`bg-[${colorTheme}]`);
        document.querySelector(`#lines`).classList.remove(`hidden`);
    }
    else
    {
        document.querySelector(`#pwr-light`).classList.remove(`border-[${colorTheme}]`);
        document.querySelector(`#pwr-light`).classList.add(`border-zinc-500`);
        document.querySelector(`#pwr-bar`).classList.remove(`bg-[${colorTheme}]`);
        document.querySelector(`#pwr-bar`).classList.add(`bg-zinc-500`);
        document.querySelector(`#lines`).classList.add(`hidden`);
    }
    if (poweredOn)
    {
        textToAdd = 'Welcome to Ryan Industries Terminal|Powered By RJOS|||Please wait while terminal loads|BOOTING BIOS|.|LOADING ............|.|LOADING ............|.|.|BIOS Loaded|.|BOOTING OS|.|LOADING ............|.|LOADING ............|.|LOADING ............|.|Loading Login|.|LOADING ............|.|Logging In as Guest|';
        textOnScreen = '';
        textloc.innerHTML = '';
        asciiDiv = ``
        displayloc.innerHTML = '';
        displayTextToAdd = '';
        displayTextOnScreen = '';
        isAbout = false;
        isFeatured = false;
        isProjects = false;
        isUpcoming = false;
        isSettings = false;
        isChat = false;
        isBoot = true;
        isLogin = false;
        isMainScreen = false;
        writeToScreen();
        homeScreen();
    }
});