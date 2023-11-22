const smiles = ["&#128512;", "&#128513;", "&#128514;", "&#128515;", "&#128516;", "&#128517;", "&#128518;", "🥥", "🐼", "🐰", "🐨", "🐱",
    "🦒", "🦆", "✌️", "🤘", "🤙", "👍", "👌", "🍫", "☘️", "🌻", "🌿", "🍀", "🌞", "🌈"];

function getRandomSmile() {
    const randomIndex = Math.floor(Math.random() * smiles.length);
    return smiles[randomIndex];
}

let isSmileChanged = false;

function pickRandomSmile() {
    const smile = document.getElementById("smile");

    if (!isSmileChanged) {
        smile.innerHTML = getRandomSmile();
        isSmileChanged = true;
    }

    smile.classList.add("scale");

    setTimeout(() => {
        smile.classList.remove("scale");
    }, 100);

}

function resetIsSmileChanged() {
    isSmileChanged = false;
}




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
        const data = await getData();
        displayMeditationData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


const DataManager = {
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

const imgUrl = DataManager.getItem("imgUrl");
if(imgUrl!=null){
    document.getElementById("avatarImg").src=imgUrl;
}




function sendMessage(message) {
    var encodedMessage = encodeURIComponent(JSON.stringify(message));
    window.location.href = 'player.html?data=' + encodedMessage;
}


const items = document.getElementById("scrollableItems");
const item = document.getElementById("scrollableItem");

let gotThemes = [];

function displayMeditationData(data) {
    data.forEach((meditation, index) => {
        if (!gotThemes.includes(meditation.theme)) {

            const newItem = item.cloneNode(true);
            newItem.id = meditation.name;
            const preview = newItem.querySelector("#preview");
            const play = newItem.querySelector("#play");
            preview.src = meditation.gifPath;
            preview.addEventListener("click", function (){
                sendMessage(meditation);
            });
            play.addEventListener("click", function (){
                sendMessage(meditation);
            });
            newItem.querySelector("#" + "name").textContent = meditation.name;

            items.append(newItem);
            gotThemes.push(meditation.theme);
        }
    });

    item.remove();
}

fetchData();