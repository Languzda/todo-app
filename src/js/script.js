"use strict";

const DUMMY_TASKS = [
  { title: "Make a new model", id: 1 },
  { title: "Start learning", id: 2 },
  { title: "Make a tree", id: 3 },
];

const state = {
  tasks: [],
};

let buttons;

function onLoad() {
  //Make loading from localStorage
  state.tasks = DUMMY_TASKS;

  const taskFromLocal = JSON.parse(localStorage.getItem("tasks"));
  if (taskFromLocal) {
    state.tasks = taskFromLocal;
  }

  // render tasks
  renderTasks(state.tasks);
}

function getTaskBoxTemplate({ taskId, taskTitle }) {
  let html = `<div class="task" data-id="task-${taskId}">
      <p class="task-title">${taskTitle}</p>
      <button class="btn-task-done">Done</button>
   </div> `;

  return html;
}

function createNewTask(task) {
  const id = Math.random();
  const idString = id.toString().slice(2);
  console.log(idString);

  const taskWithId = { ...task, id: idString };
  state.tasks.push(taskWithId);
  // make pushing state to localStorage
  localStorage.setItem("tasks", JSON.stringify(state.tasks));

  // render tasks
  renderTasks(state.tasks);
}

function renderTasks(tasks) {
  const taskContainer = document.querySelector(".task-container");

  taskContainer.innerHTML = "";

  tasks.forEach((task) => {
    const markup = getTaskBoxTemplate({
      taskId: task.id,
      taskTitle: task.title,
    });
    taskContainer.insertAdjacentHTML("afterbegin", markup);
  });

  buttons = document.querySelectorAll(".btn-task-done");

  buttons.forEach((b) =>
    b.addEventListener("click", (e) => {
      console.log(e.target.closest(".task"));
    })
  );
}

const btnAddTask = document.querySelector(".btn-add-task");
const overlay = document.querySelector(".overlay");
const modalWindow = document.querySelector(".modal");

btnAddTask.addEventListener("click", (e) => {
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnSubmitForm = document.querySelector(".btn-form");

function closeModal() {
  overlay.classList.add("hidden");
  modalWindow.classList.add("hidden");
}

[overlay, btnCloseModal].forEach((element) =>
  element.addEventListener("click", closeModal)
);

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const dataArr = [...new FormData(form)];
  const data = Object.fromEntries(dataArr);
  console.log(data);

  // validate
  const task = { title: data.title };
  closeModal();
  document.querySelector("#form-description").value = "";
  document.querySelector("#form-title").value = "";
  createNewTask(data);
});

onLoad();
