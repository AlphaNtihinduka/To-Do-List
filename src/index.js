import './index.css';

const taskContainer = document.querySelector('.task-container');
const tasks = [
  {
    description: 'Complete Capstone project',
    completed: true,
    index: 0,
  },
  {
    description: 'Javascript finished',
    completed: false,
    index: 1,
  },
  {
    description: 'Finish Microverse',
    completed: true,
    index: 2,
  },
];
function tasksDisplay() {
  taskContainer.innerHTML = tasks.map((task) => `
<li class="task-list">
<label for="${task.index}" class="label-checkbox">
<input type="checkbox" id="${task.index}" class="input">
<p class="task-name">${task.description}</p>
</label>
<div ><i class="fa fa-ellipsis-v more-icon"></i></div>
</li>
`).join('');
}
tasksDisplay();
