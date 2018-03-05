//GLOBAL Variables
var taskListActive = []; //global list of active tasks 
var taskListCompleted = []; //global list of completed tasks
var taskListDeleted = []; //global list of deleted tasks
var newTaskEntry = document.querySelector('#newTaskEntry');
var addRequest = document.querySelector('#addbutton');
var editRequest = document.querySelector('#editbutton');
var sortRequest = document.querySelector('#sortbutton');
var completeRequest = document.querySelector('#completebutton');
var deleteRequest = document.querySelector('#deletebutton');
var resetRequest = document.querySelector('#resetbutton');
var displayActiveDiv = document.querySelector('#activetasklist');
var taskBeingEdited = null;
var userName;

//=========================Object Task=====================================================
//Task is constructor function for a task in the lists todoList
function Task(task) {   
    this.task = task;
    this.dateCreated = Date.now(); 
    this.completed = false;
    this.urgent = false;
}
//================================ADD A TASK TO ACTIVE Task List=============================
//function addToActiveTaskList creates and adds a new task to active-tasks-list or 
//adds and edited tassk on list
function addToActiveTaskList(task) {
    if (task !== "") {
        if (taskBeingEdited === null) {
            let newTask = new Task(task);
            taskListActive.push(newTask);
            localStorage.setItem("activeTasks", JSON.stringify(taskListActive));
        } else {
            taskBeingEdited.task = task;
            taskListActive.push(taskBeingEdited);
            taskBeingEdited = null;
            localStorage.setItem("activeTasks", JSON.stringify(taskListActive));
        } 
    } else {
        alert('Enter the task please!');
    }
    return;
}
//=================================DISPLAY all Tasks- ACTIVE & DELETED=================
//function updateActiveTaskDisplay deletes current list and creates a new list on screen
function updateActiveTaskDisplay() {
    let oldUL = document.querySelector('#activetasklistUL');
    oldUL.remove();
    let ul = document.createElement('ul');
    ul.id = "activetasklistUL";
    ul.className = "white-text thick-text";
    
    var li;
    //if there are no to dos in active or completed state, ..
    if (taskListActive.length == 0 && taskListCompleted.length == 0) {
        li = document.createElement('li');
        li.textContent = "No ACTIVE To dos";
        ul.appendChild(li);
        li = document.createElement('li');
        li.textContent = "No COMPLETED To dos";
        ul.appendChild(li);
        displayActiveDiv.appendChild(ul);
        return;
    }
 
    ul.className = "list-group";
    displayActiveDiv.appendChild(ul);
    let i = 0;
    //add currently active tasks in list
    for (i = 0; i < taskListActive.length; i++ ) {
        li = document.createElement('li');
        li.className = "list-group-item thick-text";   
        li.innerHTML = '<input type="checkbox" aria-label="..." name="mycheckedbox"> ' + taskListActive[i].task;
        ul.appendChild(li);
    }

    //add completed tasks in list if any
    for (i = 0; i < taskListCompleted.length; i++ ) {
        li = document.createElement('li');
        li.className = "list-group-item thick-text gray-text";   
        li.classList.add("line");
        li.innerHTML = '<input type="checkbox" aria-label="..." name="mycheckedbox" disabled="true"> ' + taskListCompleted[i].task;
        ul.appendChild(li);
    }
    return;
}
//===================================SUBMIT=====================================================
//Event triggered when a new task is entered clicking SUBMIT button
newTaskEntry.addEventListener('submit', function(e) {
    addToActiveTaskList(newTaskEntry.newToDo.value); //create a new task and add to active task list
    newTaskEntry.newToDo.value = "";
    updateActiveTaskDisplay();
    e.preventDefault();
})
//=======================================ADD=================================================
//Event triggered when user wants add a task clicking "Add a new ToDo" button
addRequest.addEventListener('click', function(e) {
    addToActiveTaskList(newTaskEntry.newToDo.value); //create a new task and add to active task list
    newTaskEntry.newToDo.value = "";
    updateActiveTaskDisplay();
    e.preventDefault();
})
//=======================================ENTER==================================================
//Event  triggered when a user hits ENTER key to add a new event
newTaskEntry.addEventListener('keydown', function (e) {
    //check to see if the enter key was pressed
    if (e.key === "Enter") {
        addToActiveTaskList(newTaskEntry.newToDo.value); //create a new task and add to active task list
        newTaskEntry.newToDo.value = "";
        updateActiveTaskDisplay();
        e.preventDefault();
    }
  });
//======================================EDIT===================================================
//Event triggered when user wants edit a task
editRequest.addEventListener('click', function(e) {
    editTasks();
    e.preventDefault();
})
//==========================================================================================
//function to edit todo item
function editTasks() {
    var checkedBoxes = document.querySelectorAll('input[name=mycheckedbox]');

    if (taskListActive.length === 0) {
        alert('To Do List is empty');
        return;
    }
    for (let i = 0; i < checkedBoxes.length; i++) {
        if (checkedBoxes[i].checked) {
            newTaskEntry.newToDo.value = taskListActive[i].task;
            let temp = taskListActive.splice(i, 1);
            localStorage.setItem("activeTasks", JSON.stringify(taskListActive));
            taskBeingEdited = temp[0];
            updateActiveTaskDisplay();
            return;
        }
    }
    alert("No To Do checked for Edit"); 
}
//================================SORT===================================================
//Event triggered when user wants sort the active task list
sortRequest.addEventListener('click', function(e) {
    sortTasks();
    e.preventDefault();
})
//=====================================================================================
//function to sort the active todo item
function sortTasks() {

    if (taskListActive.length === 0) {
        alert('To Do List is empty');
        return;
    }

    taskListActive.sort(function(a, b) { //sort teh active task list based on task name
        var taskA = a.task.toUpperCase(); // ignore upper and lowercase
        var taskB = b.task.toUpperCase(); // ignore upper and lowercase
        if (taskA < taskB) {
            return -1;
        }
        if (taskA > taskB) {
            return 1;
        }
        return 0;
    });
    //update local storage with sorted task list and update display
    localStorage.setItem("activeTasks", JSON.stringify(taskListActive));
    updateActiveTaskDisplay();
    return;
}
//=================================COMPLETE===========================================
//Event triggered when a user wants to mark a task completed
completeRequest.addEventListener('click', function(e) {
    completeTask();
    e.preventDefault();
})

function completeTask() {
    var checkedBoxes = document.querySelectorAll('input[name=mycheckedbox]');
    var taskBeingCompleted = null;

    if (taskListActive.length === 0) {
        alert('No active task');
        return;
    }
    //remove checked tasks from active tasks list and add to completed task list
    let atleastOneCheckedBox = false;
    let j = 0;
    for (let i = 0; i < checkedBoxes.length; i++) {
        if (checkedBoxes[i].checked) {
            atleastOneCheckedBox = true;
            let temp = taskListActive.splice(j,1);
            localStorage.setItem("activeTasks", JSON.stringify(taskListActive));
            taskBeingCompleted = temp[0];
            taskBeingCompleted.completed = true;
            taskListCompleted.push(taskBeingCompleted);
        } else {
            j++;
        }
    }
    //sync completed task with local storage and update screen; if no checked tasks, alert user
    if (atleastOneCheckedBox) {
        localStorage.setItem("completedTasks", JSON.stringify(taskListCompleted));
        updateActiveTaskDisplay(); 
    } else {
        alert('No To Do checked to mark completed');
    }
    return;
}
//================================DELETE====================================================
//Event triggered whe a user wants to delete a task
deleteRequest.addEventListener('click', function(e) {
    deleteTask();
    e.preventDefault();
})

//function to delete a task 
function deleteTask() {
    var checkedBoxes = document.querySelectorAll('input[name=mycheckedbox]');
    var taskBeingDeleted = null;

    if (taskListActive.length === 0) {
        alert('No active task');
        return;
    }
    //remove checked tasks from active tasks list and add to deleted task list
    let atleastOneCheckedBox = false;
    let j = 0;
    for (let i = 0; i < checkedBoxes.length; i++) {
        if (checkedBoxes[i].checked) {
            if (confirm('Do you really want to DELETE the To Do - ' + taskListActive[j].task + '?')) {
                atleastOneCheckedBox = true;
                let temp = taskListActive.splice(j, 1);
                localStorage.setItem("activeTasks", JSON.stringify(taskListActive));
                taskBeingDeleted = temp[0];
                taskListDeleted.push(taskBeingDeleted);
            }
        } else {
            j++;
        }
    }
    //sync completed task with local storage and update screen; if no checked tasks, alert user
    if (atleastOneCheckedBox) {
        localStorage.setItem("deletedTasks", JSON.stringify(taskListDeleted));
        updateActiveTaskDisplay(); 
    } else {
        alert('No To Do to delete');
    }
    return;
}
//=======================================RESET=============================================
//Event triggered whe a user wants to empty all tasks or resets task lists
resetRequest.addEventListener('click', function(e) {
    resetTask();
    e.preventDefault();
})

//function to empty all task lists - a reset function!
function resetTask() {
    if (confirm('Do you really want to RESET the ToDo list?')) {
        //clear local storage, reset variables and reset screen
        localStorage.clear(); 
        taskListActive.length = 0;  
        taskListCompleted.length = 0;
        taskListDeleted.length = 0;
        taskBeingEdited = null;
        updateUserName();
        updateActiveTaskDisplay();
    }
    return;
}

//function to update user name with the info entered by the user or stored in local storage
function updateUserName() {
    var h4 = document.querySelector("#username");
    var uname = localStorage.getItem("user");
    h4.textContent = "My Name";
    if (uname === null) {
        uname = prompt("Welcome to the ToDo List Application. What is your name?");
        localStorage.setItem("user", uname);
    }
    h4.textContent = uname;
}

//==================================INITIALIZE FROM STORAGE==============================
//initialize global lists from local storage if they exist
//if lists exist, display them
if (localStorage.getItem("completedTasks") !== null) {
    taskListCompleted = JSON.parse(localStorage.getItem("completedTasks"));
}
if (localStorage.getItem("deletedTasks") !== null) {
    taskListDeleted = JSON.parse(localStorage.getItem("deletedTasks"));
}
if (localStorage.getItem("activeTasks") !== null) {
    taskListActive = JSON.parse(localStorage.getItem("activeTasks"));
    updateActiveTaskDisplay();
}

//check if the is new user, if so, ask for user name and story it.
updateUserName();






