// Get the input and the ul using DOM access and store them in variables.
// When the submit button is clicked get the user input and add it to an array.

var taskListActive = []; //list of active tasks 
var taskListComp = []; //list of completed tasks

//Task is constructor function for a task in the lists todoList
function Task(x) {   
    this.task = x;
    this.dateCreated = Date.now();
    this.completed = false;
}

//function assToActiveTaskList creates and adds a new task into active tasks list and update 
function addToActiveTaskList(x) {
    var newTask = new Task(x);
    taskListActive.push(newTask);
    //console.log(taskListActive);
}

var displayActiveDiv = document.querySelector('#activetasklist');

function updateActiveTaskDisplay() {
    //console.log(taskListActive);
    let oldUL = document.querySelector('#activetasklistUL');
    console.log(oldUL);
    oldUL.remove();
    let ul = document.createElement('ul');
    ul.className = "list-group";
    ul.id = "activetasklistUL";
    displayActiveDiv.appendChild(ul);
    for (i = 0; i < taskListActive.length; i++ ) {
        let li = document.createElement('li');
        li.textContent = taskListActive[i].task;
        li.className = "list-group-item";
        ul.appendChild(li);
    }
}

var newTaskEntry = document.querySelector('#newTaskEntry');

newTaskEntry.addEventListener('submit', function(e) {
    addToActiveTaskList(newTaskEntry.newToDo.value); //create a new task and add to active task list
    updateActiveTaskDisplay();
    e.preventDefault();
})



