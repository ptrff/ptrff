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
    },
};

function getData() {
    // информация профиля
    let nickname = DataManager.getItem("nickname");
    if (nickname == null) {
        nickname = "неизвестен";
    }
    document.getElementById("nickname").textContent = nickname;

    let imgUrl = DataManager.getItem("imgUrl");
    if (imgUrl == null) {
        imgUrl = "img/manulav.jpg";
    }
    document.getElementById("avatar").src = imgUrl;

    let email = DataManager.getItem("email");
    if (email == null) {
        email = "E-mail: не заполнен";
    } else {
        email = "E-mail: " + email;
    }
    document.getElementById("email").textContent = email;

    let date = DataManager.getItem("date");
    if (date == null) {
        date = "Дата рождения: не введена";
    } else {
        date = "Дата рождения: " + date;
    }
    document.getElementById("date").textContent = date;

    let city = DataManager.getItem("city");
    if (city == null) {
        city = "Город: не введён";
    }else {
        city = "Город: "+city;
    }
    document.getElementById("city").textContent = city;

    let lovely = DataManager.getItem("lovely");
    if (lovely == null) {
        lovely = "нет любимых тем";
    }
    document.getElementById("lovely").textContent = lovely;

    let ignored = DataManager.getItem("ignored");
    if (ignored == null) {
        ignored = "нет тем для игнора";
    }
    document.getElementById("ignored").textContent = ignored;


    //прослушивания
    let currentCount = DataManager.getItem("listens");
    if (currentCount == null) {
        currentCount = 0;
    } else {
        currentCount = parseInt(currentCount);
    }
    console.log("Прослушано тем: " + currentCount);

    //скиппед
    let skippedCount = DataManager.getItem("skips");
    if (skippedCount == null) {
        skippedCount = 0;
    } else {
        skippedCount = parseInt(skippedCount);
    }
    console.log("Пропущено тем: " + skippedCount);


    document.getElementById("listens").textContent = currentCount + " шт.";
    document.getElementById("hours").textContent = Math.floor(currentCount / 60);
    document.getElementById("skipped").textContent = skippedCount;
}

getData();