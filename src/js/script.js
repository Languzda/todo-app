"use strict";

const DUMMY_TASKS = [
  { title: "Make a new model" },
  { title: "Start learning" },
  { title: "Make a tree" },
];

const state = {
  tasks: [],
};

function onLoad() {
  //Make loading from localStorage
  state.tasks = DUMMY_TASKS;

  // render tasks
}

function getTaskBoxTemplate({ taskId, taskTitle }) {
  let html = `<div class="task" id="task-${taskId}">
      <p class="task-title">${taskTitle}</p>
      <button class="btn-task-done">Done</button>
   </div> `;

  return html;
}

function createNewTask(task) {
  state.tasks.push(task);

  // make pushing state to localStorage

  // render tasks
}

const buttons = document.querySelectorAll(".btn-task-done");

buttons.forEach((b) =>
  b.addEventListener("click", (e) => {
    console.log(e.target.closest(".task"));
  })
);

function renderTasks(tasks) {
  return 0;
}

onLoad();
