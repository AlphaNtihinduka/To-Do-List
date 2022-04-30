import { taskContainer, taskInput } from './variable.js';

let editIndex;
let isEditedTask = false;
// getting localStorage tasks
let localTasks = JSON.parse(localStorage.getItem('tasks'));

function editTask(taskId, editName) {
  editIndex = taskId;
  isEditedTask = true;
  taskInput.value = editName;
}
function tasksDisplay() {
  let li = '';
  if (localTasks) {
    localTasks.forEach((task, id) => {
      const isCompleted = task.completed === true ? 'checked' : '';
      li += `
        <li class="task-list">
        <label for="${id}" class="label-checkbox">
        <input type="checkbox"  ${isCompleted} id="${id}" class="check-input">
        <p class="task-name ${isCompleted}">${task.description}</p>
        </label>
        <div class="more-container" >
        <i class="fa fa-ellipsis-v more-icon" "></i>
        <ul class="delete-edit">
          <li><i class="fa fa-trash"  id=${id}"></i></li>
          <li class="edit" id=${id} ">Edit</li>
        </ul>
        </div>
        </li>
      `;
    });
  }
  taskContainer.innerHTML = li;
  document.querySelectorAll('.edit').forEach((el) => {
    el.addEventListener('click', (element) => {
      editIndex = element.target.id;
      isEditedTask = true;
      taskInput.value = JSON.parse(localStorage.getItem('tasks')).filter(
        (element, index) => index == editIndex,
      )[0].description;
    });
  });

  function resetIndex() {
    localTasks.forEach((item, index) => {
      item.index = index + 1;
      localStorage.setItem('Tasks', JSON.stringify(localTasks));
    });
  }

  document.querySelectorAll('.fa-trash').forEach((el) => {
    el.addEventListener('click', (deleteIndex) => {
      const start = deleteIndex.target;
      const deleteTasks = parseInt(start.id, 10);

      localTasks.splice(deleteTasks, 1);
      tasksDisplay();
      resetIndex();
      localStorage.setItem('tasks', JSON.stringify(localTasks));
    });
  });

  // for day4
  document.querySelectorAll('.check-input').forEach((el) => {
    el.addEventListener('click', (selectedTask) => {
      const taskName = selectedTask.target.parentElement.lastElementChild;
      if (selectedTask.target.checked) {
        taskName.classList.add('checked');
        localTasks[selectedTask.target.id].completed = true;
      } else {
        taskName.classList.remove('checked');
        localTasks[selectedTask.target.id].completed = false;
      }
      localStorage.setItem('tasks', JSON.stringify(localTasks));
    });
  });
  //
  document.querySelectorAll('.more-icon').forEach((el) => {
    el.addEventListener('click', (selectedTask) => {
      const deleteEditUl = selectedTask.target.parentElement.lastElementChild;
      deleteEditUl.classList.add('show');
      // Removing a class
      document.addEventListener('click', (e) => {
        if (e.target.tagName !== 'I' || e.target !== selectedTask.target) {
          deleteEditUl.classList.remove('show');
        }
      });
    });
  });
}
tasksDisplay();
function showDeleteEdit(selectedTask) {
  // getting Delete edit ul
  const deleteEditUl = selectedTask.parentElement.lastElementChild;
  deleteEditUl.classList.add('show');
  // Removing a class
  document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'I' || e.target !== selectedTask) {
      deleteEditUl.classList.remove('show');
    }
  });
}

//

//
function deleteTask(deleteIndex) {
  const start = deleteIndex + 1;
  for (let i = start; i < localTasks.length; i += 1) {
    localTasks[i].index -= 1;
  }
  localTasks.splice(deleteIndex, 1);
  localStorage.setItem('tasks', JSON.stringify(localTasks));
  tasksDisplay();
}

taskInput.addEventListener('keyup', (e) => {
  const EnteredTask = taskInput.value.trim();
  if (e.key === 'Enter' && EnteredTask) {
    if (!isEditedTask) {
      if (!localTasks) {
        localTasks = [];
      }
      const arrayStore = JSON.parse(localStorage.getItem('tasks')) || [];
      const arrayLength = arrayStore.length;
      const taskInfo = {
        description: EnteredTask,
        completed: false,
        index: arrayLength + 1,
      };
      localTasks.push(taskInfo);
    } else {
      isEditedTask = false;
      localTasks[editIndex].description = EnteredTask;
    }
    taskInput.value = '';
    localStorage.setItem('tasks', JSON.stringify(localTasks));

    tasksDisplay();
  }
});