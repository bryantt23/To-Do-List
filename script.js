//form script
let openForm = document.querySelector(".open");
openForm.addEventListener("click", function () {
    document.querySelector(".form-popup").style.display = "block";
});

let closeForm = document.querySelector(".cancel")
closeForm.addEventListener("click", function () {
    document.querySelector(".form-popup").style.display = "none";
})

let addTask = document.querySelector(".btn")
addTask.addEventListener("click", function () {
    document.querySelector(".form-popup").style.display = "none";
})