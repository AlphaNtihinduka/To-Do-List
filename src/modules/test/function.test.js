import { addTasks } from "../function.js";

const html = `<div class="do-list-parent">
<div class="heading">
    <div class="title">Today's Task</div>
    <i class="fa fa-refresh"></i>
</div>
<div class="task-input-container">
    <input type="text" placeholder="Add to your list..." class="task-input">
    <img src="https://p7.hiclipart.com/preview/951/481/305/computer-icons-enter-key-arrow-arrow-material.jpg" alt="enter" class="enter-icon">
</div>
<ul class="task-container">
</ul>
<p class="clear-completed">Clear all completed</p>
</div>`;

document.body.innerHTML = html;
console.log(document.body.innerHTML)

const li = `<li class="task-list">
    <label for="id" class="label-checkbox">
    <input type="checkbox" id="id" class="check-input">
    <p class="task-name">Description</p>
    </label>
    <div class="more-container" >
    <i class="fa fa-ellipsis-v more-icon" "></i>
    <ul class="delete-edit">
    <li><i class="fa fa-trash"  id="id"></i></li>
    <li class="edit" id="id" ">Edit</li>
    </ul>
    </div>
</li>`;

describe("The addition and removal of tasks", () => {
    test("Adding tasks", () => {
        addTasks({
            description: "This is the first",
            completed: false,
            index: 1
        });
        expect(addTasks()).toEqual([{
            description: "This is the first",
            completed: false,
            index: 1
        }])
    })
})


