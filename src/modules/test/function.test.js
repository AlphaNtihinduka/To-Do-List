import {
  addTasks, removeTask, setTaskList, taskList,
} from '../function.js';
// import { taskContainer } from '../variable.js';

const html = `<div class="do-list-parent">
<div class="heading">
    <div class="title">Today's Task</div>
    <i class="fa fa-refresh"></i>
</div>
<div class="task-input-container">
    <input type="text" value="This is a task" class="task-input">
    <img src="https://p7.hiclipart.com/preview/951/481/305/computer-icons-enter-key-arrow-arrow-material.jpg" alt="enter" class="enter-icon">
</div>
<ul class="task-container">
</ul>
<p class="clear-completed">Clear all completed</p>
</div>`;

const li = `<li class="task-list">
    <label for="id" class="label-checkbox">
    <input type="checkbox" id="id" class="check-input">
    <p class="task-name">Description</p>
    </label>
    <div class="more-container" >
    <i class="fa fa-ellipsis-v more-icon" "></i>
    <ul class="delete-edit">
    <li><i class="fa fa-trash"  id="trashBtn"></i></li>
    <li class="edit" id="editBtn" ">Edit</li>
    </ul>
    </div>
</li>`;

describe('The addition and removal of tasks', () => {
  test('Adding tasks', () => {
    document.body.innerHTML = html;
    const event = { key: 'Enter' };

    addTasks(event);

    const list = taskList();
    expect(list).toBeDefined();
    expect(list).toHaveLength(1);
    expect(list[0]).toEqual({
      description: 'This is a task',
      completed: false,
      index: 1,
    });
  });

  test('Deleting tasks', () => {
    document.body.innerHTML = html;
    const taskContainer = document.querySelector('.task-container');
    taskContainer.innerHTML = li;
    setTaskList([{
      description: 'This is a task',
      completed: false,
      index: 1,
    }]);
    const trashBtn = document.querySelector('#trashBtn');
    const event = { target: trashBtn };

    removeTask(event);

    const list = taskList();
    expect(list).toBeDefined();
    expect(list).toHaveLength(0);
    expect(list).toEqual([]);
  });
});
