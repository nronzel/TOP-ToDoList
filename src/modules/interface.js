import { format } from "date-fns";
import Project from "./project.js";
import Task from "./task.js";
import Storage from "./storage.js";

export default class Interface {
  static loadHome() {
    Interface.initProjects();
    Interface.initProjectBtnActions();
    Interface.openProject("Today", document.querySelector(".today"));
    Interface.initTaskBtnActions();
  }

  static initProjects() {
    Storage.getList()
      .getProjects()
      .forEach((project) => {
        if (project.title !== "Today") {
          Interface.drawProject(project.title);
        }
      });
    Interface.initProjectBtnActions();
  }

  static initTasks(projTitle) {
    Storage.getList()
      .getProject(projTitle)
      .getTasks()
      .forEach((task) => Interface.drawTask(task.title, task.dueDate));

    Interface.initTaskBtnActions();
    Interface.initTaskPopupBtnActions();
  }

  // EVENT LISTENERS
  static initAllActions() {
    Interface.initProjectBtnActions();
    Interface.initTaskBtnActions();
    Interface.initTaskPopupBtnActions();
    Interface.initDefaultProjectActions();
  }

  static initClosePopupBtnActions() {
    const closePopupBtns = document.querySelectorAll(".close-popup");
    closePopupBtns.forEach((btn) =>
      btn.addEventListener("click", Interface.closeAllPopups)
    );
  }

  static initDefaultProjectActions() {
    const defaultProjs = document.querySelectorAll("#defaultProj");
    defaultProjs.forEach((proj) =>
      proj.addEventListener("click", Interface.defaultProjActions)
    );
  }

  static initTaskPopupBtnActions() {
    const newTaskBtn = document.getElementById("newTaskBtn");
    const newTaskPopup = document.getElementById("newTaskPopup");
    newTaskBtn.addEventListener("click", Interface.activateTaskPopup);
    newTaskPopup.addEventListener("click", Interface.handleTaskPopup);
    Interface.initClosePopupBtnActions();
  }

  static initProjectBtnActions() {
    const projectBtns = document.querySelectorAll("#projectBtn");
    const newProjPopup = document.getElementById("newProjPopup");
    const newProjBtn = document.getElementById("newProjBtn");
    const todayBtn = document.querySelector(".today");
    newProjBtn.addEventListener("click", Interface.activateProjectPopup);
    projectBtns.forEach((btn) =>
      btn.addEventListener("click", Interface.projBtnActions)
    );
    newProjPopup.addEventListener("click", Interface.handleProjPopup);
    todayBtn.addEventListener("click", Interface.openTodayTasks);
    Interface.initClosePopupBtnActions();
  }

  static initTaskBtnActions() {
    const tasks = document.querySelectorAll(".task");
    const dueDateInputs = document.querySelectorAll(".input-due-date");
    tasks.forEach((task) =>
      task.addEventListener("click", Interface.taskBtnActions)
    );
    dueDateInputs.forEach((input) => {
      input.addEventListener("change", Interface.setDueDate);
    });
  }

  // DRAW CONTENT
  static drawProject(title) {
    const projects = document.getElementById("projectList");
    projects.innerHTML += `
    <button id="projectBtn" class="nav-btn">
            <div class="nav-btn-left">
              <i class="fa-solid fa-list-check"></i>
              <span>${title}</span>
            </div>
            <div class="nav-btn-right">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </button>`;
    Interface.initProjectBtnActions();
  }

  static drawTask(title, dueDate = "No Due Date") {
    const tasks = document.querySelector(".task-container");
    tasks.innerHTML += `
    <button class="task">
            <div class="task-left">
              <i class="fa-regular fa-circle blue-svg"></i>
              <p class="task-subject">${title}</p>
            </div>
            <div class="task-right">
              <p class="due-date">${dueDate}</p>
              <input type="date" class="input-due-date">
              <i class="fa-solid fa-xmark remove-task-svg"></i>
            </div>
          </button>`;
    Interface.initTaskBtnActions();
    Interface.initTaskPopupBtnActions();
  }

  static loadProjectData(projTitle) {
    const taskSection = document.querySelector(".task-section");
    taskSection.innerHTML = `
    <h1 id="projTitle" class="project-title">${projTitle}</h1>
    <div class="task-container"></div>
    <!-- NEW TASK BUTTON -->
    <button id="newTaskBtn" class="new-task-btn">
      <i class="fa-solid fa-circle-plus blue-svg"></i>
      <span>Add Task</span>
    </button>
    <!-- ADD TASK POPUP -->
    <div id="newTaskPopup" class="add-task-popup">
      <input class="new-task-input" type="text" placeholder="Enter task name...">
      <button class="add-btn-popup">
        <i class="fa-solid fa-check"></i>
      </button>
      <button id="closeTaskPopup" class="close-popup">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    `;
    Interface.initTasks(projTitle);
  }

  // CLEAR SECTIONS
  static clearAll() {
    Interface.clearTasks();
    Interface.clearProjects();
    Interface.clearTaskSection();
  }

  static clearTasks() {
    const tasks = document.querySelector(".task-container");
    tasks.textContent = "";
  }

  static clearProjects() {
    const projects = document.getElementById("projectList");
    projects.textContent = "";
  }

  static clearTaskSection() {
    const taskSection = document.querySelector(".task-section");
    taskSection.textContent = "";
  }

  // CLEAR ELEMENTS OR STYLES
  static clearAllActive() {
    const navBtns = document.querySelectorAll(".nav-btn");
    navBtns.forEach((btn) => btn.classList.remove("active"));
  }

  static clearNewProjInput() {
    const input = document.querySelector(".new-proj-input");
    input.value = "";
  }

  static clearNewTaskInput() {
    const input = document.querySelector(".new-task-input");
    input.value = "";
  }

  static closeAllPopups() {
    Interface.closeProjectPopup();
    Interface.closeTaskPopup();
  }

  // MAIN BUTTON ACTION HANDLERS
  static projBtnActions(e) {
    const title = this.children[0].children[1].textContent;

    if (
      e.target.classList.contains("fa-xmark") ||
      e.target.parentNode.classList.contains("fa-xmark")
    ) {
      Interface.removeProject(title, this);
      return;
    }
    Interface.openProject(title, this);
    Interface.clearAllActive();
    this.classList.add("active");
  }

  static taskBtnActions(e) {
    if (
      e.target.classList.contains("fa-xmark") ||
      e.target.parentNode.classList.contains("fa-xmark")
    ) {
      Interface.removeTask(this);
      return;
    }
    if (
      e.target.classList.contains("fa-circle") ||
      e.target.parentNode.classList.contains("fa-circle")
    ) {
      console.log("completed task");
      // Interface.completeTask()
      return;
    }
    if (e.target.classList.contains("due-date")) {
      Interface.openDateInput(this);
    }
  }

  static defaultProjActions(e) {
    Interface.clearAllActive();
    this.classList.add("active");
  }

  // POPUP HANDLERS
  static handleProjPopup(e) {
    if (
      e.target.classList.contains("fa-xmark") ||
      e.target.parentNode.classList.contains("fa-xmark")
    ) {
      Interface.closeProjectPopup();
    }
    if (
      e.target.classList.contains("fa-check") ||
      e.target.parentNode.classList.contains("fa-check")
    ) {
      Interface.addProject();
      Interface.initProjectBtnActions();
    }
    Interface.clearNewProjInput();
  }

  static handleTaskPopup(e) {
    if (
      e.target.classList.contains("fa-xmark") ||
      e.target.parentNode.classList.contains("fa-xmark")
    ) {
      Interface.closeTaskPopup();
    }
    if (
      e.target.classList.contains("fa-check") ||
      e.target.parentNode.classList.contains("fa-check")
    ) {
      const input = document.querySelector(".new-task-input");
      if (input.value == "") {
        alert("Task name cannot be blank!");
      }
      Interface.addTask();
      // Interface.drawTask(input.value);
      Interface.closeTaskPopup();
      Interface.initTaskPopupBtnActions();
      Interface.initTaskBtnActions();
    }
    Interface.clearNewTaskInput();
  }

  // POPUPS
  // PROJECT POPUP
  static activateProjectPopup() {
    const newProjPopup = document.getElementById("newProjPopup");
    const newProjBtn = document.getElementById("newProjBtn");
    newProjPopup.classList.add("active");
    newProjBtn.style.display = "none";
  }

  static closeProjectPopup() {
    const newProjPopup = document.getElementById("newProjPopup");
    const newProjBtn = document.getElementById("newProjBtn");
    newProjPopup.classList.remove("active");
    newProjBtn.style.display = "flex";
  }

  // TASK POPUP
  static activateTaskPopup() {
    const newTaskPopup = document.getElementById("newTaskPopup");
    const newTaskBtn = document.getElementById("newTaskBtn");
    newTaskPopup.classList.add("active");
    newTaskBtn.style.display = "none";
  }

  static closeTaskPopup() {
    const newTaskPopup = document.getElementById("newTaskPopup");
    const newTaskBtn = document.getElementById("newTaskBtn");
    newTaskPopup.classList.remove("active");
    newTaskBtn.style.display = "flex";
  }

  // ADD PROJECT
  static addProject() {
    const input = document.querySelector(".new-proj-input");
    const projTitle = input.value;
    if (projTitle === "") {
      alert("Project title cannot be empty!");
      return;
    }
    if (Storage.getList().contains(projTitle)) {
      alert("Project title must be different from existing project.");
      return;
    }
    Storage.addProject(new Project(projTitle));
    Interface.drawProject(projTitle);
    Interface.closeProjectPopup();
  }

  static openProject(projTitle, projButton) {
    const defaultProjs = document.querySelectorAll("#defaultProj");
    const projectBtns = document.querySelectorAll("#projectBtn");
    const buttons = [...defaultProjs, ...projectBtns];
    buttons.forEach((button) => button.classList.remove("active"));
    projButton.classList.add("active");
    Interface.closeProjectPopup();
    Interface.loadProjectData(projTitle);
  }

  static removeProject(projTitle, button) {
    if (button.classList.contains("active")) Interface.clearTaskSection();
    Storage.removeProject(projTitle);
    Interface.clearProjects();
    Interface.initProjects();
  }

  static openTodayTasks() {
    Storage.updateToday();
    Interface.openProject("Today", this);
  }

  static addTask() {
    const projTitle = document.getElementById("projTitle").textContent;
    const input = document.querySelector(".new-task-input");
    const taskTitle = input.value;
    if (taskTitle === "") {
      alert("Task title cannot be empty.");
      return;
    }
    if (Storage.getList().getProject(projTitle).contains(taskTitle)) {
      alert("Task titles must be different.");
      input.value = "";
      return;
    }
    Storage.addTask(projTitle, new Task(taskTitle));
    Interface.drawTask(taskTitle);
    Interface.closeTaskPopup();
  }

  static removeTask(taskBtn) {
    const projTitle = document.getElementById("projTitle").textContent.trim();
    const taskTitle = taskBtn.children[0].children[1].textContent.trim();

    Storage.removeTask(projTitle, taskTitle);
    Interface.clearTasks();
    Interface.initTasks(projTitle);
  }

  static updateToday() {
    const list = Storage.getList();
    list.updateToday();
    Storage.saveList(list);
  }

  // SET DATE
  static setDueDate() {
    const taskBtn = this.parentNode.parentNode;
    const projTitle = document.getElementById("projTitle").textContent;
    const taskTitle = taskBtn.children[0].children[1].textContent;
    const newDueDate = format(new Date(this.value), "MM/dd/yyy");

    if (projTitle === "Today") {
      Storage.setDueDate(projTitle, taskTitle, newDueDate);
      if (projTitle === "Today") {
        Storage.updateToday();
      }
    } else {
      Storage.setDueDate(projTitle, taskTitle, newDueDate);
    }
    Interface.clearTasks();
    Interface.initTasks(projTitle);
    Interface.closeDateInput(taskBtn);
  }

  static openDateInput(task) {
    const dueDate = task.children[1].children[0];
    const dueDateInput = task.children[1].children[1];
    dueDate.classList.add("active");
    dueDateInput.classList.add("active");
    console.log("opening");
  }

  static closeDateInput(task) {
    const dueDate = task.children[1].children[0];
    console.log(dueDate);
    console.log("closing");
  }
}
