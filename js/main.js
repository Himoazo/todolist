"use strict";
// Variables
let newItem = document.getElementById("newtodo");
let errorMsg = document.getElementById("message");
let addToDo = document.getElementById("newtodobutton");
let toDoList = document.getElementById("todolist");
let clearList = document.getElementById("clearbutton");

// Handelsehanterare
newItem.addEventListener("keyup", checkItemText, false);   //Kontrollera antal inmatade tecken
addToDo.addEventListener("click", addItem, false);         //Får till "lägg till" knappen att lägga till todos 
clearList.addEventListener("click", clearStorage, false);  //Rensa knappen
window.onload = loadStorage;                               // vid sidoladdning läs in sparade todos 

//funktioner

// lägg till i listan.
function addItem(){
    let input = newItem.value; //läser in det som skrivs i "att göra" textfält
    //kontroll så att det inte går att lagra vid mindre än 5 tecken
    if(input.length > 5){
    // skapar nya element
    let newEl = document.createElement("article");
    let todoText = document.createTextNode(input);
    newEl.appendChild(todoText);
    toDoList.appendChild(newEl);
    newEl.className = "item";

    // Radera todo från listan vid klick 
    newEl.addEventListener("click", deleteItem, false);

    // lagra till webstorage
    storeItem();
    // Radera innehåll i textfältet
    newItem.value = "";
    }
}

// radera från listan.
function deleteItem(e){
    let parentNode = e.target.parentNode;
    parentNode.removeChild(e.target);
    // lagra i webstorage
    storeItem();
}

// kontrollera om inmatad text innehåller fem eller fler tecken.
function checkItemText(){
    let input = newItem.value;

    if(input.length < 5){
        errorMsg.innerHTML = "Ange minst fem tecken"; //felmeddelande vid förkort text
    }else {
        errorMsg.innerHTML = "";
    }
} 

// för inläsning/utskrift av lagrat data i web storage.

function loadStorage(){
    let items = JSON.parse(localStorage.getItem("items")); //konvertera från string till js object
    //Loopar genom array
    for(let i = 0; i<items.length; i++){
        //Skapar nya element
        let newEl = document.createElement("article");
        let todoText = document.createTextNode(items[i]);
        newEl.appendChild(todoText);
        toDoList.appendChild(newEl);
        newEl.className = "item";
    
        // Radera todo från listan vid klick 
        newEl.addEventListener("click", deleteItem, false);

        //lagring
        storeItem();
    }
} 

// lagring av inmatning till web storage.
function storeItem(){
    let savedItem = document.getElementsByClassName("item");
    let itemArr = [];
    // Loopa genom todo items och sparar dem i array
    for(let i = 0; i<savedItem.length; i++){
        itemArr.push(savedItem[i].innerHTML);
    }
    // Konverterar från js object till string
    let jsonStr = JSON.stringify(itemArr);
    //Lagra i webstorage
    localStorage.setItem("items", jsonStr);
} 

// rensning av lagrat data i web storage.
function clearStorage(){
    toDoList.innerHTML = "";
    storeItem();
} 
