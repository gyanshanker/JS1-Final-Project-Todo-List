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

//function addToActiveTaskList creates and adds a new task into active tasks list and update 
function addToActiveTaskList(x) {
    if (x !== "") {
        var newTask = new Task(x);
        taskListActive.push(newTask);
    }
    //console.log(taskListActive);
}

var displayActiveDiv = document.querySelector('#activetasklist');
//function updateActiveTaskDisplayupdats list of active tasks as dislayed on screen
function updateActiveTaskDisplay() {
    //console.log(taskListActive);
    let oldUL = document.querySelector('#activetasklistUL');
    //console.log(oldUL);
    oldUL.remove();
    let ul = document.createElement('ul');
    ul.className = "list-group";
    ul.id = "activetasklistUL";
    displayActiveDiv.appendChild(ul);
    for (i = 0; i < taskListActive.length; i++ ) {

        let li = document.createElement('li');
        //li.textContent = taskListActive[i].task;
        li.className = "list-group-item";
        li.innerHTML = '<input type="checkbox" aria-label="..." name="checked"> ' + taskListActive[i].task;
        //console.log(li);
        ul.appendChild(li);
    }
}

//     var checkboxes = document.querySelectorAll('input[type=checkbox]');

//     for(var i = 0; i < checkboxes.length; i++) {
//         checkboxes[i].addEventListener('change', function(e){
//             if (e.srcElement.checked === true) {
//                 console.log("Task Checked for action");
//             } 
//             // console.log(e);
//             // console.log(e.target.type);
//             // console.log(e.srcElement.checked);

//             //console.log(taskListActive[i].task);
//         });
//     }
// }

var newTaskEntry = document.querySelector('#newTaskEntry');

newTaskEntry.addEventListener('submit', function(e) {
    addToActiveTaskList(newTaskEntry.newToDo.value); //create a new task and add to active task list
    updateActiveTaskDisplay();
    e.preventDefault();
})

var editRequest = document.querySelector('#editbutton');

editRequest.addEventListener('click', function(e) {
    console.log('edit request');
    console.log(e);
    e.preventDefault();
})

var completeRequest = document.querySelector('#completebutton');

completeRequest.addEventListener('click', function(e) {
    console.log('complete request');
    console.log(e);
    e.preventDefault();
})

var deleteRequest = document.querySelector('#deletebutton');

deleteRequest.addEventListener('click', function(e) {
    console.log('delete request');
    console.log(e);
    e.preventDefault();
})

// get all the checkboxes on the page
//var checkboxes = document.querySelectorAll('input[type=checkbox]');

// add a change event listener
// for(var i = 0; i < checkboxes.length; i++) {
//     checkboxes[i].addEventListener('change', function(){
//         console.log('the checkbox changed');
//     });
// }


// document.querySelector("#activetasklist").addEventListener('click', function(e) {
//     if (e.target.type === 'checkbox') {
//         console.log(e);


// })




