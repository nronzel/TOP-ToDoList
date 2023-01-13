import Project from "./project";
import Task from "./task";
import List from "./list";
import Storage from "./storage";

export default class Interface {

  static loadHome() {
    Interface.initProjects()
  }

  static initUpcoming() {

  }

  static initProjects() {
    // load projects from Storage and create the list
    // for each project draw it in the projects section
    // call a drawProject() function
    Storage.getList().getProjects().forEach((project) => {
      if(project.title !== 'Today'){
        Interface.drawProject(project.title)
      }
    })
    Interface.initAll()
  }

  // EVENT LISTENERS
  static initAll() {
    Interface.initProjectBtnActions()
    Interface.initTaskBtnActions()
    Interface.initDefaultProjectActions()
  }

  static initClosePopupBtnActions() {
    const closePopupBtns = document.querySelectorAll(".close-popup")
    closePopupBtns.forEach((btn) => btn.addEventListener('click', Interface.closeAllPopups))
  }

  static initDefaultProjectActions() {
    const defaultProjs = document.querySelectorAll("#defaultProj")
    defaultProjs.forEach((proj) => proj.addEventListener('click', Interface.defaultProjActions))
    Interface.initClosePopupBtnActions()
  }

  static initTaskBtnActions() {
    const newTaskBtn = document.getElementById("newTaskBtn")
    const newTaskPopup = document.getElementById("newTaskPopup")
    newTaskBtn.addEventListener('click', Interface.activateTaskPopup)
    newTaskPopup.addEventListener('click', Interface.handleTaskPopup)
    Interface.initClosePopupBtnActions()
  }

  static initProjectBtnActions() {
    const projectBtns = document.querySelectorAll("#projectBtn")
    const newProjPopup = document.getElementById("newProjPopup")
    const newProjBtn = document.getElementById("newProjBtn")
    newProjBtn.addEventListener('click', Interface.activateProjectPopup)
    projectBtns.forEach((btn) => btn.addEventListener('click', Interface.projBtnActions))
    newProjPopup.addEventListener('click', Interface.handleProjPopup)
    Interface.initClosePopupBtnActions()
  }

  // DRAW CONTENT
  static drawProject(title) {
    const projects = document.getElementById("projectList")
    projects.innerHTML += `
    <button id="projectBtn" class="nav-btn">
            <div class="nav-btn-left">
              <i class="fa-solid fa-list-check"></i>
              <span>${title}</span>
            </div>
            <div class="nav-btn-right">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </button>
    `
  }

  static drawTask(title, dueDate="No Due Date") {
    const tasks = document.querySelector(".task-container")
    tasks.innerHTML += `
    <button class="task">
            <div class="task-left">
              <i class="fa-regular fa-circle blue-svg"></i>
              <p class="task-subject">${title}</p>
            </div>
            <div class="task-right">
              <p class="due-date">${dueDate}</p>
              <i class="fa-solid fa-xmark remove-task-svg"></i>
            </div>
          </button>
    `
  }

  static drawTaskContainer(projTitle) {
    const taskSection = document.querySelector(".task-section")
    taskSection.innerHTML += `
    <h1 class="project-title">${projTitle}</h1>
    <div class="task-container"></div>
    `

    taskSection.innerHTML += `
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
    `
  }


  // PROJECT BUTTON ACTIONS
  static projBtnActions(e) {
    const title = this.children[0].children[1].textContent;

    if (e.target.classList.contains("fa-xmark") || 
    e.target.parentNode.classList.contains("fa-xmark")) {
        // Interface.removeProject()
        console.log('removed')
    }
    // open tasks of the project(title)
    // Interface.openProject(title, this)
    Interface.clearAllActive()
    this.classList.add("active")
  }

  static defaultProjActions(e) {
    const title = this.innerText.trim();
    Interface.clearAllActive()
    this.classList.add("active")
  }

  static clearAllActive() {
    const navBtns = document.querySelectorAll(".nav-btn")
    navBtns.forEach((btn) => btn.classList.remove("active"))
  }

  // POPUPS
  // PROJECT POPUP
  static activateProjectPopup() {
    const newProjPopup = document.getElementById("newProjPopup")
    const newProjBtn = document.getElementById("newProjBtn")
    newProjPopup.classList.add("active");
    newProjBtn.style.display = "none"
  }

  static closeProjectPopup() {
    const newProjPopup = document.getElementById("newProjPopup")
    const newProjBtn = document.getElementById("newProjBtn")
    newProjPopup.classList.remove("active")
    newProjBtn.style.display = "flex"
  }

  static clearNewProjInput() {
    const input = document.querySelector(".new-proj-input")
    input.value = ""
  }

  static handleProjPopup(e) {
    if (e.target.classList.contains("fa-xmark") ||
    e.target.parentNode.classList.contains("fa-xmark")) {
      Interface.closeProjectPopup()
    }
    if (e.target.classList.contains("fa-check") ||
    e.target.parentNode.classList.contains("fa-check")) {
      const input = document.querySelector(".new-proj-input")
      if (input.value == "") {
        alert("Project name cannot be blank!")
      }
      Interface.drawProject(input.value)
      Interface.closeProjectPopup()
      Interface.initProjectBtnActions()
    }
    Interface.clearNewProjInput()
  }

  // TASK POPUP
  static activateTaskPopup() {
    const newTaskPopup = document.getElementById("newTaskPopup")
    const newTaskBtn = document.getElementById("newTaskBtn")
    newTaskPopup.classList.add("active");
    newTaskBtn.style.display = "none"
  }

  static closeTaskPopup() {
    const newTaskPopup = document.getElementById("newTaskPopup")
    const newTaskBtn = document.getElementById("newTaskBtn")
    newTaskPopup.classList.remove("active")
    newTaskBtn.style.display = "flex"
  }

  static closeAllPopups() {
    Interface.closeProjectPopup()
    Interface.closeTaskPopup()
  }

  static handleTaskPopup(e) {
    if (e.target.classList.contains("fa-xmark") ||
    e.target.parentNode.classList.contains("fa-xmark")) {
      Interface.closeTaskPopup()
    }
    if (e.target.classList.contains("fa-check") ||
    e.target.parentNode.classList.contains("fa-check")) {
      const input = document.querySelector(".new-task-input")
      if (input.value == "") {
        alert("Task name cannot be blank!")
      }
      console.log(input.value)
      Interface.drawTask(input.value)
      Interface.closeTaskPopup()
      Interface.initTaskBtnActions()
    }
    Interface.clearNewTaskInput()
  }

  static clearNewTaskInput() {
    const input = document.querySelector(".new-task-input")
    input.value = ""
  }

}