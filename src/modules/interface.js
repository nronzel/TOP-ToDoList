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
    const projectsList = new List();
    Interface.addDefaultEventListeners()
  }

  static initAddBtns() {

  }
  
  static drawProject(title) {
    const projects = document.getElementById("projectList")
    projects.innerHTML += `
    <button class="nav-btn active">
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

  static addDefaultEventListeners() {
    const newProjectBtn = document.getElementById("newProjBtn")
    const newTaskBtn = document.getElementById("newTaskBtn")
    const projectBtns = document.querySelectorAll("#projectBtn")
    const defaultProjs = document.querySelectorAll("#defaultProj")
    const closeBtns = document.querySelectorAll(".close-btn")

    newProjectBtn.addEventListener('click', Interface.activateProjectPopup)
    newTaskBtn.addEventListener('click', Interface.activateTaskPopup)
    defaultProjs.forEach((proj) => proj.addEventListener('click', Interface.defulatProjActions))
    projectBtns.forEach((btn) => btn.addEventListener('click', Interface.projBtnActions))
    closeBtns.forEach((btn) => btn.addEventListener('click', Interface.closeAllPopups))
  }



  // PROJECT BUTTON ACTIONS
  static projBtnActions(e) {
    const title = this.children[0].children[1].textContent;
    console.log(this)

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

  static defulatProjActions(e) {
    console.log(this.innerText.trim());
  }

  static clearAllActive() {
    const navBtns = document.querySelectorAll(".nav-btn")
    navBtns.forEach((btn) => btn.classList.remove("active"))
  }

  // POPUPS
  // PROJECT POPUP
  static activateProjectPopup() {
    const newProjPopup = document.getElementById("newProjPopup")
    newProjPopup.classList.add("active");
    Interface.handleProjPopup()
  }

  static closeProjectPopup() {
    const newProjPopup = document.getElementById("newProjPopup")
    newProjPopup.classList.remove("active")
  }

  static handleProjPopup(e) {
    console.log(e)
  }

  // TASK POPUP
  static activateTaskPopup() {
    const newTaskPopup = document.getElementById("newTaskPopup")
    newTaskPopup.classList.add("active");
  }

  static closeTaskPopup() {
    const newTaskPopup = document.getElementById("newTaskPopup")
    newTaskPopup.classList.remove("active")
  }

  static closeAllPopups() {
    Interface.closeProjectPopup()
    Interface.closeTaskPopup()
  }



}