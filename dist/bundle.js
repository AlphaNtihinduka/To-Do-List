/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// import './index.css';\r\n\r\nconst taskContainer = document.querySelector('.task-container');\r\nconst taskInput = document.querySelector('.task-input');\r\nconst clearComplete = document.querySelector('.clear-completed');\r\nlet editIndex;\r\nlet isEditedTask = false;\r\n\r\n//getting localStorage tasks\r\nlet localTasks = JSON.parse(localStorage.getItem(\"tasks\"))\r\n// let taskNumber = [];\r\n// for (let i = 0; i<localTasks.length; i++) {\r\n//   taskNumber.push(i);\r\n\r\n// }\r\n// let taskLength = taskNumber.length;\r\n// console.log(taskLength)\r\n\r\n\r\n// const tasks = [\r\n//   {\r\n//     description: 'Complete Capstone project',\r\n//     completed: true,\r\n//     index: 0,\r\n//   },\r\n//   {\r\n//     description: 'Javascript finished',\r\n//     completed: false,\r\n//     index: 1,\r\n//   },\r\n//   {\r\n//     description: 'Finish Microverse',\r\n//     completed: true,\r\n//     index: 2,\r\n//   },\r\n// ];\r\nfunction tasksDisplay() {\r\n//   taskContainer.innerHTML = localTasks.map((task, index) => `\r\n// <li class=\"task-list\">\r\n// <label for=\"${task.index}\" class=\"label-checkbox\">\r\n// <input type=\"checkbox\" id=\"${task.index}\" class=\"check-input\">\r\n// <p class=\"task-name\">${task.description}</p>\r\n// </label>\r\n// <div ><i class=\"fa fa-ellipsis-v more-icon\"></i></div>\r\n// </li>\r\n// `).join('');\r\n    let li = \"\";\r\n   if(localTasks){\r\n    localTasks.forEach((task, id) => {\r\n      let isCompleted = task.completed == true ? \"checked\": \"\";\r\n      li += `\r\n        <li class=\"task-list\">\r\n        <label for=\"${id}\" class=\"label-checkbox\">\r\n        <input type=\"checkbox\" onclick=\"completionStatus(this)\" ${isCompleted} id=\"${id}\" class=\"check-input\">\r\n        <p class=\"task-name ${isCompleted}\">${task.description}</p>\r\n        </label>\r\n        <div class=\"more-container\" >\r\n        <i class=\"fa fa-ellipsis-v more-icon\" onclick=\"showDeleteEdit(this)\"></i>\r\n        <ul class=\"delete-edit\">\r\n          <li><i class=\"fa fa-trash\" onclick=\"deleteTask(${id})\"></i></li>\r\n          <li class=\"edit\" onclick=\"editTask(${id}, '${task.description}')\">Edit</li>\r\n        </ul>\r\n        \r\n        </div>\r\n        </li>\r\n        \r\n      `\r\n});\r\n   }\r\ntaskContainer.innerHTML = li;\r\n}\r\ntasksDisplay();\r\n\r\nfunction completionStatus(selectedTask) {\r\n  let taskName = selectedTask.parentElement.lastElementChild;\r\n  if(selectedTask.checked) {\r\n    taskName.classList.add(\"checked\");\r\n    localTasks[selectedTask.id].completed = true;\r\n  } else {\r\n    taskName.classList.remove(\"checked\");\r\n    localTasks[selectedTask.id].completed = false;\r\n  }\r\n  localStorage.setItem(\"tasks\", JSON.stringify(localTasks));\r\n}\r\n\r\nfunction showDeleteEdit(selectedTask) {\r\n  //getting Delete edit ul\r\n  let deleteEditUl = selectedTask.parentElement.lastElementChild;\r\n  deleteEditUl.classList.add(\"show\");\r\n  //Removing a class\r\n  document.addEventListener(\"click\", e => {\r\n    if(e.target.tagName != \"I\" || e.target != selectedTask) {\r\n      deleteEditUl.classList.remove(\"show\");\r\n    }\r\n  })\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction deleteCompletedTask(description){\r\n  const tasks = JSON.parse(localStorage.getItem(\"tasks\"));\r\n  const index = tasks.findIndex((item => item.description === description));\r\n  deleteTask(index);\r\n}\r\n\r\nfunction editTask(taskId, editName) {\r\n   editIndex = taskId; \r\n   isEditedTask = true\r\n  taskInput.value = editName\r\n}\r\n\r\nclearComplete.addEventListener(\"click\", ()=>{\r\n const tasks = JSON.parse(localStorage.getItem(\"tasks\"));\r\ntasks.filter((item) => item.completed === true).forEach((item) => deleteCompletedTask(item.description))\r\n  tasksDisplay()\r\n})\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction deleteTask(deleteIndex) {\r\n  const start = deleteIndex + 1;\r\n  for (let i = start; i<localTasks.length; i+=1) {\r\n    localTasks[i].index -= 1;\r\n  }\r\n  localTasks.splice(deleteIndex, 1);\r\n  localStorage.setItem(\"tasks\", JSON.stringify(localTasks));\r\n  tasksDisplay()\r\n};\r\n\r\n\r\n\r\ntaskInput.addEventListener('keyup', e=>{\r\nlet EnteredTask = taskInput.value.trim();\r\nif(e.key ===\"Enter\" && EnteredTask) {\r\n  if(!isEditedTask) {\r\n    if(!localTasks) {\r\n      localTasks = [];\r\n  };\r\n  const arrayStore = JSON.parse(localStorage.getItem(\"tasks\")) || [];\r\n  let arrayLength = arrayStore.length;\r\n  let taskInfo = {description: EnteredTask, completed: false, index: arrayLength + 1};\r\n  localTasks.push(taskInfo);\r\n  } else {\r\n    isEditedTask = false;\r\n    localTasks[editIndex].description = EnteredTask;\r\n  };\r\n  taskInput.value = \"\";\r\n  localStorage.setItem(\"tasks\", JSON.stringify(localTasks));\r\n  tasksDisplay();\r\n};\r\n});\n\n//# sourceURL=webpack://To-Do-List/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;