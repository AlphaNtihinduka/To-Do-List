   import {
    checkTask, setTaskList, taskList, editTask
  } from '../function.js'; 

  // import { clearListener } from '../complete.js';

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
      <input type="checkbox" class="check-input">
      <p class="task-name">Description</p>
      </label>
      <div class="more-container" >
      <i class="fa fa-ellipsis-v more-icon" "></i>
      <ul class="delete-edit">
      <li><i class="fa fa-trash"  id="trashBtn"></i></li>
      <li class="edit" id="id">Edit</li>
      </ul>
      </div>
  </li>`;



  describe("check status and clear complete", () => {
    test("check status", () => {
        document.body.innerHTML = html;
        const taskContainer = document.querySelector('.task-container');
        taskContainer.innerHTML = li;
        setTaskList([{
          description: "This is a task",
          completed: false,
          index: 1,
        }])

        const checkInput = document.querySelector(".check-input");
        checkInput.id = 0;
        checkInput.checked  = true;
        const event = { target: checkInput }
        checkTask(event);

        const list = taskList();
        expect(list).toBeDefined();
        expect(list.length).toBe(1);
        expect(list[0].completed).toBe(true)

    })

    test("Edit tasks", () => {
      document.body.innerHTML = html;
      const taskContainer = document.querySelector('.task-container');
      taskContainer.innerHTML = li;
      setTaskList([{
        description: "This is a task",
        completed: false,
        index: 1,
      }])

      const editBtn = document.querySelector(".edit");
      editBtn.id = 0;
      editBtn.isEditedTask = true
      const event = {target: editBtn};
      console.log(editBtn.id)
      editTask(event)

      const list = setTaskList()
      expect(list).toBeDefined()
    })


  })

  // test("clear completed", () => {
  //   document.body.innerHTML = html;
  //   const taskContainer = document.querySelector('.task-container');
  //   taskContainer.innerHTML = li;
  //   setTaskList([{
  //     description: "This is a task",
  //     completed: false,
  //     index: 1,
  //   }])

  //   const clearCompletedBtn = document.querySelector(".clear-completed");
  //   clearCompletedBtn.id = taskIndex;
  //   clearCompletedBtn.isEditedTask = true
  //   const event = {target: editBtn};

  //   editTask(event)
  // })