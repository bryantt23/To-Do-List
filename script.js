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

addTask.addEventListener("click", function (event) {
    event.preventDefault();
    let taskInfo = taskValue();
    displayTask(taskInfo);
    document.querySelector(".form-popup").style.display = "none";
    reset.reset();
});

//Access Tasks Dropdown Open/Close on Click In/Out
const viewTaskbtn = document.querySelector(".dropbtn")
const viewTask = document.querySelector(".dropdown-content")

viewTaskbtn.addEventListener("click", function () {
    if (viewTask.style.display === "block") {
        viewTask.style.display = "none";
    } else {
        viewTask.style.display = "block";
    }
});

document.addEventListener("click", function (event) {
    if (event.target !== viewTaskbtn && !viewTask.contains(event.target)) {
        viewTask.style.display = "none";
    }
});

//Get Tasks Values
function Task(category, title, description, date, priority, notes) {
    this.category = category;
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.notes = notes;
};

function taskValue() {
    const category = document.getElementById("category").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const notes = document.getElementById("notes").value;
    const priority = document.getElementById("p-type").value;

    const taskInfo = new Task(category, title, description, date, priority, notes);

    return taskInfo;
};

//Display Tasks on Page
function displayTask(taskInfo) {
    const taskList = document.getElementById("task-list");
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-style");
    const catP = document.createElement("p");
    catP.classList.add("cat-task");
    catP.textContent = `Category: ${taskInfo.category}`;
    const titleP = document.createElement("p");
    titleP.classList.add("title-task");
    titleP.textContent = `Title: ${taskInfo.title}`;
    const descriptP = document.createElement("p");
    descriptP.classList.add("descript-task");
    descriptP.textContent = `Description: ${taskInfo.description}`;
    const dateP = document.createElement("p");
    dateP.classList.add("date-task");
    dateP.textContent = `Due Date: ${taskInfo.date}`;
    const priorityP = document.createElement("p");
    priorityP.classList.add("priority-task");
    priorityP.textContent = `Priority: ${taskInfo.priority}`;
    const notesP = document.createElement("p");
    notesP.classList.add("notes-task");
    notesP.textContent = `Notes: ${taskInfo.notes}`;

    taskDiv.appendChild(catP);
    taskDiv.appendChild(titleP);
    taskDiv.appendChild(descriptP);
    taskDiv.appendChild(dateP);
    taskDiv.appendChild(priorityP);
    taskDiv.appendChild(notesP);

    taskList.appendChild(taskDiv);
};





//Display tasks on page
//Make them default on page load
//Add edit and delete buttons 
//Figure out how to sort them by category

