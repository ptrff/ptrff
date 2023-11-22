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

const container = document.getElementById("libcontent");

const items = document.getElementById("items");
const item = document.getElementById("item");

function sendMessage(message) {
    var encodedMessage = encodeURIComponent(JSON.stringify(message));
    window.location.href = 'player.html?data=' + encodedMessage;
}


function displayMeditationData(data) {
    data.forEach((meditation, index) => {
        console.log(`Meditation ${index + 1}:`);
        console.log(`  Theme: ${meditation.theme}`);
        console.log(`  Name: ${meditation.name}`);
        console.log(`  Gif Path: ${meditation.gifPath}`);
        console.log(`  Sound Path: ${meditation.soundPath}`);
        console.log('\n');


        var element = container.querySelector("#" + meditation.theme);
        if (element) {

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

            element.append(newItem);
            container.append(element);

        } else {
            const themeName = document.createElement('h1');
            themeName.classList.add("theme-name");
            themeName.textContent = meditation.theme;
            container.append(themeName);

            const newItems = items.cloneNode(true);
            newItems.id = meditation.theme;

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

            newItems.append(newItem);
            container.append(newItems);
        }
    });

    items.remove();
    item.remove();
}

fetchData();