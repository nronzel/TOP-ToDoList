import { Project } from "../src/project.js";
import { Task } from "../src/task.js";
import { ProjectList } from "../src/projectList.js"
import { openModal, closeModal, getModalTitle } from "../src/modal.js";

// creates master list of projects; each project has its own list of tasks
const list = new ProjectList()

// dummy projects
const proj1 = new Project("Project1")
const proj2 = new Project("Project2")

// create task
proj1.addTask(new Task('test task'))
proj1.addTask(new Task('hope this works'))


//
// Dom manipulation stuff
//

const domCache = {
  newProjectBtn: document.querySelector(".new-project-btn"),
  projectNavList: document.querySelector(".nav-menu-list"),
  navBtn: document.querySelector(".nav-btn"),
  overlay: document.querySelector(".overlay"),
  projModal: document.querySelector(".new-proj-modal"),
  modalSubmit: document.querySelector(".new-project-submit"),
  modalInput: document.querySelector(".new-project-input"),
  modalCloseBtn: document.querySelector(".close"),
};

const makeCardActive = (li) => {
  li.classList.add("active")
  let removeBtn = document.createElement("button")
  removeBtn.textContent = "X"
  removeBtn.classList.add("remove-btn")
  li.append(removeBtn)
}

const makeProjectCards = (project) => {
  clearProjectListDisplay();
  list.projects.forEach((project) => {
    let li = document.createElement("li")
    let btn = document.createElement("button")
    btn.textContent = project.title
    btn.classList.add("nav-btn")
    li.append(btn)
    domCache.projectNavList.append(li)
    if (list.projects.length == 1) {
      makeCardActive(li)
    }
    btn.onclick = navActive
  })
}

const getNewProject = () => {
  let title = getModalTitle();
  if (title === undefined || title.length < 1) {
    return
  } else {
    let project = new Project(title)
    list.addProject(project)
    makeProjectCards(project)
    domCache.modalInput.value = "";
    closeModal();
  }
}

const clearNavClasses = () => {
  const allNavBtns = document.querySelectorAll(".nav-btn");
  const allNavRemoveBtns = document.querySelectorAll(".remove-btn");
  allNavBtns.forEach((btn) => {
    btn.parentElement.classList.remove("active");
  });
  allNavRemoveBtns.forEach((btn) => {
    btn.outerHTML = "";
  });
};

const drawProjectList = () => {
  clearProjectListDisplay();
  projectList.forEach((project) => {
    const li = document.createElement("li");
    const navBtn = document.createElement("button");
    navBtn.textContent = project.title;
    navBtn.classList.add("nav-btn");
    li.append(navBtn);
    domCache.projectNavList.append(li);
    navBtn.onclick = navActive;
  });
};

const clearProjectListDisplay = () => {
  domCache.projectNavList.innerHTML = "";
};

const navActive = (e) => {
  const btn = document.createElement("button");

  btn.textContent = "X";
  btn.classList.add("remove-btn");
  btn.onclick = removeProject;

  if (e.target.parentElement.classList.contains("active")) {
    return;
  } else {
    clearNavClasses();
    e.target.parentElement.append(btn);
    e.target.parentElement.classList.add("active");
  }
};

const removeProject = (e) => {
  let projTitle = e.target.previousSibling.textContent;
  e.target.parentElement.outerHTML = "";
  list.removeProject(projTitle)
  console.log(list.projects)
  // list.projects.splice(projectList.findIndex((project) => project.title == projTitle), 1)
};

domCache.newProjectBtn.onclick = openModal
domCache.modalSubmit.onclick = getNewProject;
domCache.overlay.onclick = closeModal;
domCache.modalCloseBtn.onclick = closeModal;

// test project
list.addProject(proj1)
makeProjectCards(proj1);