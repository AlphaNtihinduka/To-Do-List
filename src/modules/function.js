import { taskContainer, taskInput } from './variable.js';

let editIndex;
let isEditedTask = false;
// getting localStorage tasks
let localTasks = JSON.parse(localStorage.getItem('tasks'));

export const taskList = () => JSON.parse(localStorage.getItem('tasks')) || [];
export const setTaskList = (taskList) => {
  localStorage.setItem('tasks', JSON.stringify(taskList));
  localTasks = JSON.parse(localStorage.getItem('tasks'));
};



function resetIndex() {
  localTasks.forEach((item, index) => {
    item.index = index + 1;
    localStorage.setItem('tasks', JSON.stringify(localTasks));
  });
}

export const removeTask = (e) => {
  const start = e.target;
  const deleteTasks = parseInt(start.id, 10);

  localTasks.splice(deleteTasks, 1);
  // eslint-disable-next-line no-use-before-define
  tasksDisplay();
  resetIndex();
  localStorage.setItem('tasks', JSON.stringify(localTasks));
};

const trashBtn = () => {
  document.querySelectorAll('.fa-trash').forEach((el) => {
    el.addEventListener('click', removeTask);
  });
};

export const editTask = (event) => {
  const taskIndex = event.target.id;
  console.log(taskIndex)
  editIndex = taskIndex;
  isEditedTask = true;
  const result = JSON.parse(localStorage.getItem('tasks')).filter(
    (element, index) => index.toString() === taskIndex,
  )[0].description;
  taskInput().value = result;
};

const editButton = () => {
  document.querySelectorAll('.edit').forEach((el) => {
    el.addEventListener('click', editTask);
  });
};

export const checkTask = (event) => {
        const taskName = event.target.parentElement.lastElementChild;
      if (event.target.checked) {
        taskName.classList.add('checked');
        localTasks[event.target.id].completed = true;

      } else {
        taskName.classList.remove('checked');
        localTasks[event.target.id].completed = false;
      }
      localStorage.setItem('tasks', JSON.stringify(localTasks));
}

  const checkBtn = () => { 
    document.querySelectorAll('.check-input').forEach((el) => {
    el.addEventListener('click', checkTask)
  });
}

export function tasksDisplay() {
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
  taskContainer().innerHTML = li;

  editButton();
  trashBtn();
  checkBtn();

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

export const addTasks = (e) => {
  const EnteredTask = taskInput().value.trim();
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
    taskInput().value = '';
    localStorage.setItem('tasks', JSON.stringify(localTasks));

    tasksDisplay();
  }
};
