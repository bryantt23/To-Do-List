//Create Task
const openForm = document.querySelector(".open");
openForm.addEventListener("click", function () {
    document.querySelector(".form-popup").style.display = "block";
});
//Cancel and Submit Form
const reset = document.querySelector(".form-container")
const closeForm = document.querySelector(".cancel")
const addTask = document.querySelector(".btn")

closeForm.addEventListener("click", function () {
    document.querySelector(".form-popup").style.display = "none";
    reset.reset();
});

addTask.addEventListener("click", function () {
    event.preventDefault();
    document.querySelector(".form-popup").style.display = "none";
    reset.reset();
});
//Access Tasks Dropdown Open/Close on Click In/Out
const viewTaskbtn = document.querySelector(".dropbtn")
const viewTask = document.querySelector(".dropdown-content")

viewTaskbtn.addEventListener("click", function () {
    if(viewTask.style.display === "block"){
        viewTask.style.display = "none";
    } else {
        viewTask.style.display = "block";
    }
});

document.addEventListener("click", function(event){
    if(event.target !== viewTaskbtn && !viewTask.contains(event.target)) {
        viewTask.style.display = "none";
    }
});

