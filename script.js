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
    let taskInfo = taskValue();
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

//Get Tasks Values
function taskValue() {
    let cats = document.getElementById("#category").value;
    let title = document.getElementById("#title").value;
    let descript = document.getElementById("#description").value;
    let date = document.getElementById("#date").value;
    let priority = document.querySelector(".p-value").value;
    let notes = documcument.getElementById("#notes").value;

    let taskInfo = new task(cats, title, descript, date, priority, notes);

    return taskInfo;
}





//Display tasks on page
//Make them default on page load
//Add edit and delete buttons 
//Figure out how to sort them by category

