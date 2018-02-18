//GLOBAL Variables
var taskListActive = []; //list of active tasks 
var newTaskEntry = document.querySelector('#newTaskEntry');
var editRequest = document.querySelector('#editbutton');
var completeRequest = document.querySelector('#completebutton');
var deleteRequest = document.querySelector('#deletebutton');
var displayActiveDiv = document.querySelector('#activetasklist');
var taskBeingCompleted;
var taskBeingEdited;
var taskBeingDeleted;

//Task is constructor function for a task in the lists todoList
function Task(x) {   
    this.task = x;
    this.dateCreated = Date.now(); 
    this.completed = false;
}

//function addToActiveTaskList creates and adds a new task to active-tasks-list or 
//adds and edited tassk on list
function addToActiveTaskList(x) {
    if (x !== "") {
        if (taskBeingEdited == null) {
            let newTask = new Task(x);
            taskListActive.push(newTask);
        } else {
            taskBeingEdited.task = x;
            taskListActive.push(taskBeingEdited);
        } 
    }
}

//function updateActiveTaskDisplay deletes current list and creates a new list on screen
function updateActiveTaskDisplay() {
    let oldUL = document.querySelector('#activetasklistUL');
    oldUL.remove();
    let ul = document.createElement('ul');
    ul.className = "list-group";
    ul.id = "activetasklistUL";
    displayActiveDiv.appendChild(ul);
    for (i = 0; i < taskListActive.length; i++ ) {
        let li = document.createElement('li');
        li.className = "list-group-item";   
        if (taskListActive[i].completed) {
            li.classList.add("line");
            li.innerHTML = '<input type="checkbox" aria-label="..." name="mycheckedbox" disabled="true"> ' + taskListActive[i].task;
        } else {
            li.innerHTML = '<input type="checkbox" aria-label="..." name="mycheckedbox"> ' + taskListActive[i].task;
        }
        ul.appendChild(li);
    }
}

//Event triggered when a new task is entered
newTaskEntry.addEventListener('submit', function(e) {
    addToActiveTaskList(newTaskEntry.newToDo.value); //create a new task and add to active task list
    newTaskEntry.newToDo.value = "";
    updateActiveTaskDisplay();
    e.preventDefault();
})

//Event triggered when user wants edit a task
editRequest.addEventListener('click', function(e) {
    editTasks();
    e.preventDefault();
})

//function to edit todo item
function editTasks() {
    var checkedBoxes = document.querySelectorAll('input[name=mycheckedbox]');
    taskBeingEdited = null;

    if (taskListActive.length === 0) {
        alert('No active task');
        return;
    }

    for (let i = 0; i < checkedBoxes.length; i++) {
        if (checkedBoxes[i].checked) {
            newTaskEntry.newToDo.value = taskListActive[i].task;
            let temp = taskListActive.splice(i, 1);
            taskBeingEdited = temp[0];
            updateActiveTaskDisplay();
            return;
        }
    }
    alert("No task checked to edit"); 
}

//Event triggered when a user wants to mark a task completed

completeRequest.addEventListener('click', function(e) {
    completeTask();
    e.preventDefault();
})

function completeTask() {
    var checkedBoxes = document.querySelectorAll('input[name=mycheckedbox]');
    taskBeingCompleted = null;

    if (taskListActive.length === 0) {
        alert('No active task');
        return;
    }
 
    for (let i = 0; i < checkedBoxes.length; i++) {
        if (checkedBoxes[i].checked) {
            let temp = taskListActive.splice(i,1);
            taskBeingCompleted = temp[0];
            taskBeingCompleted.completed = true;
            taskListActive.push(taskBeingCompleted);
            updateActiveTaskDisplay();
            return;
        }
    }
    alert('No task checked to mark completed');
}

//Event triggered whe a user wants to delete a task
deleteRequest.addEventListener('click', function(e) {
    deleteTask();
    e.preventDefault();
})

//function to delete a task 

function deleteTask() {
    var checkedBoxes = document.querySelectorAll('input[name=mycheckedbox]');
    taskBeingDeleted = null;

    if (taskListActive.length === 0) {
        alert('No active task');
        return;
    }

    for (let i = 0; i < checkedBoxes.length; i++) {
        if (checkedBoxes[i].checked) {
            if (confirm('Do you really want to delete the todo item?')) {
                let temp = taskListActive.splice(i, 1);
                taskBeingDeleted = temp[0];
                updateActiveTaskDisplay();
                return;
            } else {
                return;
            }

        }
    }
    alert('No task checked to delete');
}




