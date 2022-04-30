import './index.css';

const taskContainer = document.querySelector('.task-container');
const taskInput = document.querySelector('.task-input');
const clearComplete = document.querySelector('.clear-completed');
let editIndex;
let isEditedTask = false;

//getting localStorage tasks
let localTasks = JSON.parse(localStorage.getItem("tasks"))
// let taskNumber = [];
// for (let i = 0; i<localTasks.length; i++) {
//   taskNumber.push(i);

// }
// let taskLength = taskNumber.length;
// console.log(taskLength)


// const tasks = [
//   {
//     description: 'Complete Capstone project',
//     completed: true,
//     index: 0,
//   },
//   {
//     description: 'Javascript finished',
//     completed: false,
//     index: 1,
//   },
//   {
//     description: 'Finish Microverse',
//     completed: true,
//     index: 2,
//   },
// ];
function tasksDisplay() {
//   taskContainer.innerHTML = localTasks.map((task, index) => `
// <li class="task-list">
// <label for="${task.index}" class="label-checkbox">
// <input type="checkbox" id="${task.index}" class="check-input">
// <p class="task-name">${task.description}</p>
// </label>
// <div ><i class="fa fa-ellipsis-v more-icon"></i></div>
// </li>
// `).join('');
    let li = "";
   if(localTasks){
    localTasks.forEach((task, id) => {
      let isCompleted = task.completed == true ? "checked": "";
      li += `
        <li class="task-list">
        <label for="${id}" class="label-checkbox">
        <input type="checkbox" onclick="completionStatus(this)" ${isCompleted} id="${id}" class="check-input">
        <p class="task-name ${isCompleted}">${task.description}</p>
        </label>
        <div class="more-container" >
        <i class="fa fa-ellipsis-v more-icon" onclick="showDeleteEdit(this)"></i>
        <ul class="delete-edit">
          <li><i class="fa fa-trash" onclick="deleteTask(${id})"></i></li>
          <li class="edit" onclick="editTask(${id}, '${task.description}')">Edit</li>
        </ul>
        
        </div>
        </li>
        
      `
});
   }
taskContainer.innerHTML = li;
}
tasksDisplay();

function completionStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked) {
    taskName.classList.add("checked");
    localTasks[selectedTask.id].completed = true;
  } else {
    taskName.classList.remove("checked");
    localTasks[selectedTask.id].completed = false;
  }
  localStorage.setItem("tasks", JSON.stringify(localTasks));
}

function showDeleteEdit(selectedTask) {
  //getting Delete edit ul
  let deleteEditUl = selectedTask.parentElement.lastElementChild;
  deleteEditUl.classList.add("show");
  //Removing a class
  document.addEventListener("click", e => {
    if(e.target.tagName != "I" || e.target != selectedTask) {
      deleteEditUl.classList.remove("show");
    }
  })
}












function deleteCompletedTask(description){
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex((item => item.description === description));
  deleteTask(index);
}

function editTask(taskId, editName) {
   editIndex = taskId; 
   isEditedTask = true
  taskInput.value = editName
}

clearComplete.addEventListener("click", ()=>{
 const tasks = JSON.parse(localStorage.getItem("tasks"));
tasks.filter((item) => item.completed === true).forEach((item) => deleteCompletedTask(item.description))
  tasksDisplay()
})


















function deleteTask(deleteIndex) {
  const start = deleteIndex + 1;
  for (let i = start; i<localTasks.length; i+=1) {
    localTasks[i].index -= 1;
  }
  localTasks.splice(deleteIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(localTasks));
  tasksDisplay()
};



taskInput.addEventListener('keyup', e=>{
let EnteredTask = taskInput.value.trim();
if(e.key ==="Enter" && EnteredTask) {
  if(!isEditedTask) {
    if(!localTasks) {
      localTasks = [];
  };
  const arrayStore = JSON.parse(localStorage.getItem("tasks")) || [];
  let arrayLength = arrayStore.length;
  let taskInfo = {description: EnteredTask, completed: false, index: arrayLength + 1};
  localTasks.push(taskInfo);
  } else {
    isEditedTask = false;
    localTasks[editIndex].description = EnteredTask;
  };
  taskInput.value = "";
  localStorage.setItem("tasks", JSON.stringify(localTasks));
  tasksDisplay();
};
});