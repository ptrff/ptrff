function openTab(tabName) {
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active-tab");
    }

    document.getElementById(tabName).style.display = "block";

    var activeTab = document.getElementsByClassName(tabName + "t")[0];
    if (activeTab) {
        activeTab.classList.add("active-tab");
    }
}

openTab("main");



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
    },

    // Очистка всех данных
    clearAll: function () {
        try {
            localStorage.clear();
            console.log("Все данные успешно очищены.");
        } catch (error) {
            console.error("Ошибка при очистке данных:", error);
        }
    }
};



//main
const stats = document.getElementById("stats");
const sendstats = document.getElementById("sendstats");

let getStat = DataManager.getItem("getStat");
if(getStat!=null){
    stats.checked=getStat;
}else{
    stats.checked="true";
}

let sendStat = DataManager.getItem("sendStat");
if(sendStat!=null){
    sendstats.checked=sendStat;
}else{
    sendstats.checked=true;
}

stats.addEventListener("change", function () {
    DataManager.setItem("getStat", stats.checked);
});

sendstats.addEventListener("change", function () {
    DataManager.setItem("sendStat", sendstats.checked);
});

//profile

const fnick = document.getElementById("nickname");
const fimgurl = document.getElementById("imgUrl");
const female = document.getElementById("email");
const fdate = document.getElementById("date");
const fcity = document.getElementById("city");
const flovely = document.getElementById("lovely");
const fignored = document.getElementById("ignored");

let nickname = DataManager.getItem("nickname");
if(nickname!=null){
    fnick.value=nickname;
}

let imgUrl = DataManager.getItem("imgUrl");
if(imgUrl!=null){
    document.getElementById("avatar").src=imgUrl;
    document.getElementById("imgUrl").value=imgUrl;
}

let email = DataManager.getItem("email");
if(email!=null){
    document.getElementById("email").value=email;
}

let date = DataManager.getItem("date");
if(date!=null){
    document.getElementById("date").value=date;
}

let city = DataManager.getItem("city");
if(city!=null){
    document.getElementById("city").value=city;
}

let lovely = DataManager.getItem("lovely");
if(lovely!=null){
    document.getElementById("lovely").value=lovely;
}

let ignored = DataManager.getItem("ignored");
if(ignored!=null){
    document.getElementById("ignored").value=ignored;
}

document.getElementById("profile").addEventListener("submit", function(event) {
    event.preventDefault();
    if(fnick.value!=="") DataManager.setItem("nickname", fnick.value);
    if(fimgurl.value!=="") DataManager.setItem("imgUrl", fimgurl.value);
    if(female.value!=="") DataManager.setItem("email", female.value);
    if(fdate.value!=="") DataManager.setItem("date", fdate.value);
    if(fcity.value!=="") DataManager.setItem("city", fcity.value);
    if(flovely.value!=="") DataManager.setItem("lovely", flovely.value);
    if(fignored.value!=="") DataManager.setItem("ignored", fignored.value);
});


//player
const fblur = document.getElementById("blur");

let blur = DataManager.getItem("blur");
if(blur!=null){
    document.getElementById("blur").value=blur;
}else {
    document.getElementById("blur").value=5;
}

document.getElementById("player").addEventListener("submit", function(event) {
    event.preventDefault();
    DataManager.setItem("blur", fblur.value);
});


//sbrosit
function clearDann(){
    var result = confirm("Стереть все данные?");
    if (result) {
        DataManager.clearAll();
    }
}