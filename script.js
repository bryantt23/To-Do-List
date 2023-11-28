//Create Task
const openForm = document.querySelector(".open");
openForm.addEventListener("click", function () {
    document.querySelector(".form-popup").style.display = "block";
});

//Cancel and Submit Form
const clear = document.querySelector(".form-container");
const closeForm = document.querySelector(".cancel");
const addTask = document.querySelector(".btn");

closeForm.addEventListener("click", function () {
    document.querySelector(".form-popup").style.display = "none";
    clear.reset();
});

addTask.addEventListener("click", function (event) {
    event.preventDefault();
    let taskInfo = taskValue();
    displayTaskCategory(taskInfo.category);
    displayTask(taskInfo);
    document.querySelector(".form-popup").style.display = "none";
    clear.reset();
    categorizeTask(taskInfo.category, taskInfo);
    saveTasks();
});

//Access Tasks Dropdown Open/Close on Click In/Out
const viewTaskbtn = document.querySelector(".dropbtn");
const viewTask = document.querySelector(".dropdown-content");

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

document.getElementById("viewAll").addEventListener("click", function () {
    displayTaskCategory("View All");
});

document.getElementById("workAll").addEventListener("click", function () {
    displayTaskCategory("Work");
});

document.getElementById("homeAll").addEventListener("click", function () {
    displayTaskCategory("Home");
});

document.getElementById("mindAll").addEventListener("click", function () {
    displayTaskCategory("Mind");
});

document.getElementById("miscAll").addEventListener("click", function () {
    displayTaskCategory("Miscellaneous");
});

//Get Tasks Values
function task(category, title, description, date, priority, notes) {
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
    const priority = document.getElementById("priority").value;
    const notes = document.getElementById("notes").value;

    const taskInfo = new task(category, title, description, date, priority, notes);

    return taskInfo;
};

//Edit Task
function handleEditTask(taskInfo, taskDiv) {
    document.querySelector(".form-popup").style.display = "block";

    //Get form elements
    const categoryInput = document.getElementById("category");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const dateInput = document.getElementById("date");
    const priorityInput = document.getElementById("priority");
    const notesInput = document.getElementById("notes");

    // Populate the form with the task details
    categoryInput.value = taskInfo.category;
    titleInput.value = taskInfo.title;
    descriptionInput.value = taskInfo.description;
    dateInput.value = taskInfo.date;
    priorityInput.value = taskInfo.priority;
    notesInput.value = taskInfo.notes;

    // Add an event listener to handle the form submission for editing
    const editSubmit = document.querySelector(".btn");
    editSubmit.textContent = "Save Edits";

    editSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        const oldTask = JSON.parse(JSON.stringify(taskInfo));
        deleteOldTask(oldTask);
        // Update the taskInfo with the edited values
        taskInfo.category = categoryInput.value;
        taskInfo.title = titleInput.value;
        taskInfo.description = descriptionInput.value;
        taskInfo.date = dateInput.value;
        taskInfo.priority = priorityInput.value;
        taskInfo.notes = notesInput.value;

        // Update the task details in the taskDiv
        const taskDetails = taskDiv.querySelector(".task-details");
        taskDetails.querySelector(".cat-task").textContent = `Category: ${taskInfo.category}`;
        taskDetails.querySelector(".title-task").textContent = `Title: ${taskInfo.title}`;
        taskDetails.querySelector(".descript-task").textContent = `Description: ${taskInfo.description}`;
        taskDetails.querySelector(".date-task").textContent = `Due Date: ${taskInfo.date}`;
        taskDetails.querySelector(".priority-task").textContent = `Priority: ${taskInfo.priority}`;
        taskDetails.querySelector(".notes-task").textContent = `Notes: ${taskInfo.notes}`;

        document.querySelector(".form-popup").style.display = "none";
        
    });
};

function deleteOldTask(taskInfo) {
    const index = taskData[taskInfo.category].findIndex((element) => {
        return Object.keys(taskInfo).every(key => {
            return element[key] === taskInfo[key];
        });
    });
    //const index = taskData[taskInfo.category].indexOf(taskInfo);
        if (index !== -1) {
            taskData[taskInfo.category].splice(index, 1);
        }
};


//Delete Task
function handleDeleteTask(taskInfo, taskDiv) {
    if (confirm("Are you sure you want to delete this task?")) {
        deleteOldTask(taskInfo);
        taskDiv.remove();
        saveTasks();
    }
};

//Display Tasks on Page
function displayTask(taskInfo) {
    if (taskInfo === null) {
        return; 
    }

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

    //Call Edit And Delete
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-button");

    editBtn.addEventListener("click", function () {
        handleEditTask(taskInfo, taskDiv);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-button");

    deleteBtn.addEventListener("click", function () {
        handleDeleteTask(taskInfo, taskDiv);
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
//categorizeTask(category, task);

function displayTaskCategory(categoryChoice) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    if (categoryChoice === "View All") {
        for (const category in taskData) {
            if (taskData.hasOwnProperty(category)) {
                const tasks = taskData[category] || [];
                tasks.forEach((tasks) => {
                    const taskDiv = document.createElement("div");
                    taskList.appendChild(taskDiv);
                    displayTask(tasks);
                });
            }
        }
    } else {
        const tasks = taskData[categoryChoice] || [];
        tasks.forEach((tasks) => {
            const taskDiv = document.createElement("div");
            taskList.appendChild(taskDiv);
            displayTask(tasks);
        })
    };
};
//displayTaskCategory("Work");
//saveTasks();

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
//loadTasks()


function initialize() {
categorizeTask(category, task);
displayTaskCategory("Work");
loadTasks();
saveTasks();
}
initialize()




//Remove duplicate from edit and get it working properly
//fix view all bugs