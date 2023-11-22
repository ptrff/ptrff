let database;

async function getData() {
    try {
        const response = await fetch('assets/data.txt');
        const data = await response.text();
        return JSON.parse(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function fetchData() {
    try {
        database = await getData();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();


const DataManager = {
    // Запись данных по ключу
    setItem: function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            console.log("Данные успешно записаны.");
        } catch (error) {
            console.error("Ошибка при записи данных:", error);
        }
    },

    // Чтение данных по ключу
    getItem: function (key) {
        try {
            const value = localStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value);
            } else {
                console.log("Данные по ключу '" + key + "' не найдены.");
                return null;
            }
        } catch (error) {
            console.error("Ошибка при чтении данных:", error);
            return null;
        }
    }
};


function dragElement(elmnt) {

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        if (elmnt.offsetTop + elmnt.clientHeight > window.innerHeight) {
            elmnt.style.top = (window.innerHeight - elmnt.clientHeight) + "px";
        } else if (elmnt.offsetTop < 0) {
            elmnt.style.top = "0px";
        } else {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
        if (elmnt.offsetLeft + elmnt.clientWidth > window.innerWidth) {
            elmnt.style.left = (window.innerWidth - elmnt.clientWidth) + "px";
        } else if (elmnt.offsetLeft < 0) {
            elmnt.style.left = "0px";
        } else {
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

const player = document.getElementById("player");
const atmosphere = document.getElementById("atmosphere");
dragElement(player);

player.style.left = (window.innerWidth - player.clientWidth) / 2 + "px";
player.style.top = (window.innerHeight - player.clientHeight) / 2 + "px";

addEventListener("resize", (event) => {
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    if (player.offsetTop + player.clientHeight >= vh) {
        player.style.top = (vh - player.clientHeight) + "px";
    } else if (player.offsetTop < 0) {
        player.style.top = "0px";
    }

    if (player.offsetLeft + player.clientWidth >= vw) {
        player.style.left = (vw - player.clientWidth) + "px";
    } else if (player.offsetLeft < 0) {
        player.style.left = "0px";
    }
});


const minimize = document.getElementById("minimize");
const maximize = document.getElementById("maximize");

minimize.addEventListener("click", function () {
    player.style.visibility = "hidden";
    maximize.style.visibility = "";
});

maximize.addEventListener("click", function () {
    player.style.visibility = "";
    maximize.style.visibility = "hidden";
});


//player funkcional

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const mprogress = document.getElementById('mprogress');

function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0;
    }
}

function setOnClicks(selector, onClickFunction) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.onclick = onClickFunction;
    });
}

function setTextes(selector, content) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.textContent = content;
    });
}

function setSrcs(selector, src) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.src = src;
    });
}


// get user data
const imgUrl = DataManager.getItem("imgUrl");
if(imgUrl!=null){
    setSrcs(".avatar", imgUrl);
}

const blur = DataManager.getItem("blur");
if(blur!=null){
    document.body.style.backdropFilter = "blur("+blur+"px)";
}



// get data from GET
const urlParams = new URLSearchParams(window.location.search);
const encodedJsonString = urlParams.get('data');
let urlData;
let currentId;

if (encodedJsonString) {
    urlData = JSON.parse(decodeURIComponent(encodedJsonString));
    makePlaying(urlData);
} else {
    alert("no data")

}


function makePlaying(data) {

    // запишем данные о том, что прослуашли разок
    let currentCount = DataManager.getItem("listens");
    if (currentCount == null) {
        currentCount = 0;
    } else {
        currentCount = parseInt(currentCount);
    }

    // получим данные о пропусках
    let skippedCount = DataManager.getItem("skips");
    if (skippedCount == null) {
        skippedCount = 0;
    } else {
        skippedCount = parseInt(skippedCount);
    }


    DataManager.setItem("listens", currentCount + 1);
    console.log("Это " + (currentCount + 1) + " раз слушаем темы");

    currentId = parseInt(data.id);

    setTextes(".player-name", data.name);
    audio.src = data.soundPath;
    document.body.style.backgroundImage = "url(../../" + data.gifPath + ")";


    setOnClicks(".timeline", function (e) {
        var percent = e.offsetX / this.offsetWidth;
        audio.currentTime = percent * audio.duration;
    });

    setOnClicks(".play-button", function (e) {
        if (audio.paused) {
            audio.play();
            setSrcs(".play", "img/icons/pause.svg");
        } else {
            audio.pause();
            setSrcs(".play", "img/icons/play.svg");
        }
    });

    setOnClicks(".previous", function (e) {
        if (currentId - 1 > 0) {
            currentId--;
            makePlaying(database[currentId - 1])
            DataManager.setItem("skips", skippedCount + 1);
            console.log("playig " + currentId);
        } else {
            alert("Дальше тем нет");
        }
    });

    setOnClicks(".next", function (e) {
        if (currentId < database.length) {
            currentId++;
            makePlaying(database[currentId - 1])
            DataManager.setItem("skips", skippedCount + 1);
            console.log("playig " + currentId);
        } else {
            alert("Дальше тем нет");
        }
    });

    audio.addEventListener('timeupdate', function () {
        var percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + '%';
        mprogress.style.width = percent + '%';
        if (percent === 100) {
            this.children[0].src = "img/icons/play.svg";
        }
    });
}