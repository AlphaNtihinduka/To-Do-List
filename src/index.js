import './index.css';
import { taskInput } from './modules/variable.js';
import { addTasks, tasksDisplay } from './modules/function.js';
import './modules/complete.js';

window.addEventListener('load', () => {
  taskInput().addEventListener('keyup', addTasks);
  tasksDisplay();
});