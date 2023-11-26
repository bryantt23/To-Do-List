//Create Task
const openForm = document.querySelector(".open");
openForm.addEventListener("click", function () {
    document.querySelector(".form-popup").style.display = "block";
});

//Cancel and Submit Form
const reset = document.querySelector(".form-container");
const closeForm = document.querySelector(".cancel");
const addTask = document.querySelector(".btn");

closeForm.addEventListener("click", function () {
    document.querySelector(".form-popup").style.display = "none";
    reset.reset();
});

addTask.addEventListener("click", function (event) {
    event.preventDefault();
    let taskInfo = taskValue();
    displayTaskCategory(taskInfo.category);
    displayTask(taskInfo);
    document.querySelector(".form-popup").style.display = "none";
    reset.reset();
    categorizeTask(taskInfo.category, taskInfo);
    saveTasks();
});

//Access Tasks Dropdown Open/Close on Click In/Out
const viewTaskbtn = document.querySelector(".dropbtn");
const viewTask = document.querySelector(".dropdown-content");
const viewAll = document.getElementById("viewAll");
const workCat = document.getElementById("workAll");
const homeCat = document.getElementById("homeAll");
const mindCat = document.getElementById("mindAll");
const miscCat = document.getElementById("miscAll");

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

viewAll.addEventListener("click", function () {
    displayTaskCategory("View All");
});

workCat.addEventListener("click", function () {
    displayTaskCategory("Work");
});

homeCat.addEventListener("click", function () {
    displayTaskCategory("Home");
});

mindCat.addEventListener("click", function () {
    displayTaskCategory("Mind");
});

miscCat.addEventListener("click", function () {
    displayTaskCategory("Miscellaneous");
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
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

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

    taskDetails.appendChild(catP);
    taskDetails.appendChild(titleP);
    taskDetails.appendChild(descriptP);
    taskDetails.appendChild(dateP);
    taskDetails.appendChild(priorityP);
    taskDetails.appendChild(notesP);

    //Edit And Delete
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-button");

    editBtn.addEventListener("click", function () {
        
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-button");

    deleteBtn.addEventListener("click", function () {
        if(confirm("Are you sure you want to delete this task?")){
            const index = taskData[taskInfo.category].indexOf(taskInfo);
            if(index !== -1) {
                taskData[taskInfo.category].splice(index, 1);
            }
            taskDiv.remove();
            saveTasks();
        }
    });

    taskDiv.appendChild(taskDetails);
    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(deleteBtn);

    taskList.appendChild(taskDiv);
};

//Default Display Tasks And Sort Tasks By Category
let taskData = {
    Work: [
        { category: "Work", title: "Zoom Call", description: "New Client", date: "2023-11-29", priority: "Low", notes: "Use inside voice" },
        { category: "Work", title: "Email", description: "Reply to Lenny", date: "2023-11-26", priority: "Medium", notes: "Go over chart again" }
    ],
    Home: [
        { category: "Home", title: "Tidy Up", description: "Sister coming into town", date: "2023-11-30", priority: "High", notes: "Hide all of the cookies" }
    ],
    Mind: [
        { category: "Mind", title: "Study", description: "Chapter 12-14", date: "2023-12-01", priority: "Low", notes: "Highlight key points" },
        { category: "Mind", title: "Happy Thoughts", description: "Positive affirmations", date: "2023-12-02", priority: "Medium", notes: "Say these when needed" }
    ],
    Miscellaneous: [
        { category: "Miscellaneous", title: "End Subscription", description: "No more Amazon Prime", date: "2023-12-03", priority: "High", notes: "Only 5 days left" }
    ]
};

function categorizeTask(category, task) {
    if (!taskData[category]) {
        taskData[category] = [];
    }
    taskData[category].push(task);
};

function displayTaskCategory(categoryChoice) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const tasks = taskData[categoryChoice] || [];

    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskList.appendChild(taskDiv);
        displayTask(task);
    });
};

const newTaskCat = {
    Category: "Work",
    Title: "Finish Project"
};
categorizeTask(newTaskCat.category, newTaskCat);
displayTaskCategory("Work");
saveTasks();

//Using LocalStorage to Save and Load Tasks on Page
function saveTasks() {
    localStorage.setItem("taskData", JSON.stringify(taskData));
};

function loadTasks() {
    const storeData = localStorage.getItem("taskData")
    if (storeData) {
        taskData = JSON.parse(storeData);
    }
};
loadTasks()







//How to view all
//How to make new tasks stay on page when refresh page
//Add edit button functionality 
//style and format tasks

