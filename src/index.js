import { Task } from "../src/task.js";
import { openModal, closeModal, getModalTitle } from "../src/modal.js";
import { Project, ProjectList } from "./crud.js"

// ProjectList is a an object that contains a list to house all projects, 
//   and methods to add/remove/get.
// Project is a class that creates new projects 
//   with their own list that contains tasks for that project
//   as well as methods to add/remove/get tasks

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
  let removeBtn = document.createElement("button");
  if (li.classList.contains("active")) {
    return;
  } else {
    li.classList.add("active");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-btn");
    li.append(removeBtn);
  }
};

const makeProjectCards = (project) => {
  clearProjectListDisplay();
  ProjectList.list.forEach((project) => {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.textContent = project.title;
    btn.classList.add("nav-btn");
    li.append(btn);
    domCache.projectNavList.append(li);
    if (ProjectList.list.length < 2) {
      makeCardActive(li);
    } else {
      let li = domCache.projectNavList.firstChild;
      makeCardActive(li);
    }
    btn.onclick = navActive;
  });
};

const getNewProject = () => {
  let title = getModalTitle();
  if (title === undefined || title.length < 1) {
    return;
  } else {
    let project = new Project(title);
    ProjectList.add(project);
    makeProjectCards(project);
    domCache.modalInput.value = "";
    closeModal();
  }
};

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
  ProjectList.remove(projTitle);
};

domCache.newProjectBtn.onclick = openModal;
domCache.modalSubmit.onclick = getNewProject;
domCache.overlay.onclick = closeModal;
domCache.modalCloseBtn.onclick = closeModal;

// test projects
const proj1 = new Project("Project1");
const proj2 = new Project("Project2");
const proj3 = new Project("Project3");
ProjectList.add(proj1);
ProjectList.add(proj2);
ProjectList.add(proj3);
makeProjectCards(proj1);
makeProjectCards(proj2);
makeProjectCards(proj3);

// create task
proj1.add(new Task("test task"));
proj1.add(new Task("hope this works"));
