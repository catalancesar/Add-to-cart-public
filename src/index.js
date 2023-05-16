import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const dbURL = process.env.DATABASE_URL;
console.log(dbURL);
const appSettings = { databaseURL: dbURL };
const app = initializeApp(appSettings);
const database = getDatabase(app);

const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
const counterEl = document.getElementById("itemCounter");

addButtonEl.addEventListener("click", function() {
    pushItemInDB();
});

inputFieldEl.addEventListener("change", function() {
    pushItemInDB();
});

onValue(shoppingListInDB, function(snapshot) {
    clearShoppingList();
    if (snapshot.exists()) {
        let shoppingListArray = Object.entries(snapshot.val());
        counterEl.classList.remove("hiddenCounter");
        counterEl.classList.add("blow");
        counterEl.innerHTML = shoppingListArray.length;
        for (let i = 0; i < shoppingListArray.length; i++) {
            let currentItem = shoppingListArray[i];
            appendItemToShoppingList(currentItem);
        };
        setTimeout(() => {
            counterEl.classList.remove("blow");
        }, 500);
    } else {
        shoppingListEl.innerHTML = "Nothing to buy?";
        counterEl.classList.add("hiddenCounter");
    }
});

function appendItemToShoppingList(item) {
    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    newEl.addEventListener("click", function() {
        newEl.innerHTML = "&#128465";
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        setTimeout(() => {
            remove(exactLocationOfItemInDB);
        }, 250);
        
    })
    shoppingListEl.append(newEl);
};

function clearInputField() {
    inputFieldEl.value = "";
};

function clearShoppingList() {
    shoppingListEl.innerHTML = "";
};

function pushItemInDB() {
    let inputValue = inputFieldEl.value;
    if (inputValue != "") {
        push(shoppingListInDB, inputValue);
        clearInputField();
        buttonAnimation();
    }
}

function buttonAnimation() {
    addButtonEl.classList.add("prove");
    addButtonEl.innerHTML = "Added &#x2705;";
    setTimeout(() => {
        addButtonEl.classList.remove("prove");
        addButtonEl.innerHTML = "Add to cart";
    }, 500);
}