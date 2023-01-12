import Project from "./project";
import Task from "./task";
import List from "./list";

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
    Interface.addDefaultEventListeners()
  }

  static initAddBtns() {

  }


  static addDefaultEventListeners() {
    const newProjectBtn = document.getElementById("newProjBtn")
    const newTaskBtn = document.getElementById("newTaskBtn")
    const projectBtns = document.querySelectorAll("#projectBtn")
    const defaultProjs = document.querySelectorAll("#defaultProj")
    const closePopupBtns = document.querySelectorAll(".close-popup")
    const newProjPopup = document.getElementById("newProjPopup")
    const newTaskPopup = document.getElementById("newTaskPopup")

    newProjectBtn.addEventListener('click', Interface.activateProjectPopup)
    newTaskBtn.addEventListener('click', Interface.activateTaskPopup)
    newProjPopup.addEventListener('click', Interface.handleProjPopup)
    newTaskPopup.addEventListener('click', Interface.handleTaskPopup)
    defaultProjs.forEach((proj) => proj.addEventListener('click', Interface.defaultProjActions))
    projectBtns.forEach((btn) => btn.addEventListener('click', Interface.projBtnActions))
    closePopupBtns.forEach((btn) => btn.addEventListener('click', Interface.closeAllPopups))
  }

  static initProjectBtns() {
    const projectBtns = document.querySelectorAll("#projectBtn")
    const closePopupBtns = document.querySelectorAll(".close-popup")

    projectBtns.forEach((btn) => btn.addEventListener('click', Interface.projBtnActions))
    closePopupBtns.forEach((btn) => btn.addEventListener('click', Interface.closeAllPopups))
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

  static drawTask(title) {

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
      Interface.initProjectBtns()
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
      Interface.closeTaskPopup()
    }
    Interface.clearNewTaskInput()
  }

  static clearNewTaskInput() {
    const input = document.querySelector(".new-task-input")
    input.value = ""
  }

}