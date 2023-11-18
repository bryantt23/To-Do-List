//Testing webpack works
console.log("it works");

//Testing Dom stuff with webpack
const contentDiv = document.querySelector(".content");
const testing = document.createElement("h1");
testing.textContent ="THIS IS A TEST";
contentDiv.appendChild(testing);